#!/bin/bash

# Sony WH-1000XM6 Premium Scrollytelling Experience Deployment Script
# Apple-level cinematic landing page deployment

echo "🚀 Deploying Sony WH‑1000XM6 Premium Experience"
echo "================================================"

# Check for required files
echo "📁 Checking required files..."

required_files=("index.html" "style.css" "script.js" "README.md")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "❌ Missing required files:"
    printf '  %s\n' "${missing_files[@]}"
    exit 1
else
    echo "✅ All required files present"
fi

# Check for image sequence
echo "🖼️  Checking image sequence..."

if [ ! -d "ezgif-38a8f3d4bd8c4322-jpg" ]; then
    echo "⚠️  Warning: Image sequence folder not found"
    echo "   Expected: ezgif-38a8f3d4bd8c4322-jpg/"
    echo "   Please ensure you have 98 frame images for the animation"
else
    frame_count=$(find ezgif-38a8f3d4bd8c4322-jpg -name "*.jpg" | wc -l)
    if [ "$frame_count" -lt 98 ]; then
        echo "⚠️  Warning: Only $frame_count frame images found (expected 98)"
    else
        echo "✅ Image sequence ready ($frame_count frames)"
    fi
fi

# Create production build (optional minification)
echo "⚡ Optimizing for production..."

# Create optimized version of CSS (optional)
if command -v cleancss &> /dev/null; then
    echo "  Minifying CSS..."
    cleancss --output style.min.css style.css
    echo "  ✅ Created style.min.css"
else
    echo "  ℹ️  clean-css not installed, using original CSS"
fi

# Create optimized version of JS (optional)
if command -v terser &> /dev/null; then
    echo "  Minifying JavaScript..."
    terser script.js --compress --mangle --output script.min.js
    echo "  ✅ Created script.min.js"
else
    echo "  ℹ️  terser not installed, using original JavaScript"
fi

# Create deployment package
echo "📦 Creating deployment package..."

deploy_dir="sony-wh1000xm6-experience-$(date +%Y%m%d)"
mkdir -p "$deploy_dir"

# Copy all necessary files
cp index.html "$deploy_dir/"
cp style.css "$deploy_dir/"
cp script.js "$deploy_dir/"
cp README.md "$deploy_dir/"

# Copy image sequence if it exists
if [ -d "ezgif-38a8f3d4bd8c4322-jpg" ]; then
    cp -r ezgif-38a8f3d4bd8c4322-jpg "$deploy_dir/"
fi

# Copy minified versions if they exist
[ -f style.min.css ] && cp style.min.css "$deploy_dir/"
[ -f script.min.js ] && cp script.min.js "$deploy_dir/"

echo "✅ Deployment package created: $deploy_dir/"

# Create a simple test server for local preview
echo "🌐 Starting local test server (Ctrl+C to stop)..."
echo ""
echo "================================================"
echo "  Open your browser and visit:"
echo "  http://localhost:8080"
echo ""
echo "  Press Ctrl+C to stop the server"
echo "================================================"

# Start Python simple HTTP server
python3 -m http.server 8080 --directory . 2>/dev/null || \
python -m SimpleHTTPServer 8080 2>/dev/null || \
echo "Could not start test server. Please open index.html directly in your browser."

# Deployment instructions
echo ""
echo "📋 Deployment Instructions:"
echo "=========================="
echo "1. Upload all files in '$deploy_dir/' to your web server"
echo "2. Ensure the 'ezgif-38a8f3d4bd8c4322-jpg' folder is accessible"
echo "3. Configure your server to serve index.html as the default document"
echo "4. Test on different browsers and devices"
echo ""
echo "🎉 Sony WH‑1000XM6 Premium Experience is ready to deploy!"
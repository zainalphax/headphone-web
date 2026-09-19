# Sony WH‑1000XM6 — Premium Scrollytelling Experience

An ultra-premium, Apple-level cinematic landing page experience for the Sony WH‑1000XM6 headphones. This project combines scroll-driven storytelling with HTML5 Canvas image sequence animation to create a seamless, immersive product reveal.

## 🎬 Cinematic Experience Features

### Core Interaction
- **Scroll-linked Image Sequence**: 98-frame photorealistic animation of headphones disassembling/reassembling
- **Smooth Canvas Rendering**: 60fps HTML5 Canvas animation synchronized with scroll position
- **Seamless Background Integration**: Perfect color matching for edge-free presentation

### Premium Design Elements
- **Apple-inspired Glassmorphism Navbar**: Translucent, blurry navigation with smooth scroll reveal
- **Sony Corporate Color Palette**: Deep charcoal backgrounds with Sony blue/cyan accents
- **Cinematic Typography**: Gradient text effects, tight spacing, editorial hierarchy
- **Premium UI Polish**: Subtle glows, soft gradients, smooth transitions

### Scroll-driven Storytelling
- **Hero Introduction** (0-15%): Fully assembled beauty shot with confidence copy
- **Engineering Reveal** (15-40%): Headphones disassemble into components with technical narrative
- **Noise Cancelling Focus** (40-65%): Microphones and processing highlighted with feature points
- **Sound Technology** (65-85%): Drivers and acoustic chambers emphasized with emotional benefits
- **Reassembly & CTA** (85-100%): Components reassemble with strong call-to-action

## 🛠️ Technical Implementation

### Architecture
- **Pure HTML/CSS/JS**: No build tools required for immediate deployment
- **HTML5 Canvas**: High-performance image sequence rendering
- **Scroll-linked Animation**: Smooth frame interpolation based on scroll position
- **Responsive Design**: Adapts to all screen sizes with mobile optimizations

### Performance Optimizations
- **Throttled Scroll Events**: 60fps scroll handling for smooth performance
- **Frame Interpolation**: Smooth animation between frames
- **Efficient Image Loading**: Progressive loading with visual feedback
- **RAF Animation Loop**: Smooth 60fps canvas updates

### Visual Effects
- **Subtle Parallax**: Text elements move slightly as user scrolls
- **Vignette Overlay**: Cinematic darkening around edges
- **Brightness Adjustment**: Dynamic lighting based on scroll position
- **Smooth Transitions**: Cubic easing for all animations

## 🎨 Design System

### Color Palette
```css
--bg-primary: #050505;           /* Deep near-black charcoal */
--bg-secondary: #0A0A0C;         /* Subtle variation for sections */
--accent-primary: #0050FF;       /* Rich Sony blue */
--accent-secondary: #00D6FF;     /* Electric cyan highlights */
```

### Typography
- **Primary Font**: Inter (Apple's SF Pro fallback)
- **Weight Scale**: 300 (Light) to 800 (Black)
- **Hero Typography**: 4.5rem bold with gradient text
- **Body Text**: 16-18px with 0.6 opacity for calm readability

### Spacing
- **Tight Scale**: Apple-like precise spacing (0.25rem to 8rem)
- **Responsive**: Adapts spacing for mobile/desktop

## 📁 Project Structure

```
.
├── index.html              # Main HTML structure
├── style.css              # Premium CSS with design system
├── script.js              # Canvas animation & scroll logic
├── ezgif-38a8f3d4bd8c4322-jpg/
│   ├── ezgif-frame-001.jpg
│   ├── ezgif-frame-002.jpg
│   └── ... (98 frames)
├── Product_parts_exploding_in_slow_20260919143827.mp4
└── README.md
```

## 🚀 Quick Start

1. **Open in Browser**: Simply open `index.html` in a modern browser
2. **Image Sequence**: Ensure all 98 frame images are in the `ezgif-38a8f3d4bd8c4322-jpg/` folder
3. **Development**: No build process required - edit HTML/CSS/JS directly

## 🌐 Browser Support

- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 User Experience Goals

1. **First Impression**: Immediate "wow" factor with cinematic hero section
2. **Story Discovery**: Natural scroll progression reveals product story
3. **Emotional Connection**: Technical details presented as emotional benefits
4. **Call-to-Action**: Strong purchase intent built through the experience

## 🔧 Customization

### Modify Color Palette
Edit the CSS custom properties in `style.css`:
```css
:root {
    --accent-primary: #0050FF;     /* Change to your brand color */
    --bg-primary: #050505;         /* Adjust background darkness */
}
```

### Update Content
Edit the HTML sections in `index.html` to match your product narrative.

### Add/Replace Images
Replace the frames in `ezgif-38a8f3d4bd8c4322-jpg/` with your own sequence (98 frames recommended).

## 📱 Mobile Experience

- **Adaptive Navigation**: Simplified mobile nav with hamburger menu
- **Optimized Typography**: Responsive font sizes and spacing
- **Touch-friendly CTAs**: Larger buttons for mobile interaction
- **Performance**: Maintains smooth 60fps animation on modern mobile devices

## 🎥 Production Quality

This experience is designed to match:
- **Apple Product Pages**: Premium aesthetic and attention to detail
- **Sony Global Sites**: Corporate color palette and tech-forward design
- **Awwards-winning Sites**: Cutting-edge interactions and visual polish

## 📄 License

Open for educational and portfolio use. For commercial use, please ensure you have rights to the Sony WH‑1000XM6 branding and images.

---

**Experience the future of product storytelling.** Scroll to begin.
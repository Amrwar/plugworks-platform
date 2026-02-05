# Plugworks Website

A modern, visually striking website for **Plugworks** - a creative and production house based in Egypt and UAE.

## 🔌 About Plugworks

"Where Ideas Are Plugged Into Reality" - Plugworks is a creative and production house that transforms bold concepts into unforgettable experiences.

## ✨ Features

- **Modern Design**: Dark theme with electric accent colors (cyan, purple, orange)
- **Responsive**: Fully responsive design that works on all devices
- **Animated**: Smooth scroll-triggered animations and micro-interactions
- **Coming Soon Banner**: Animated marquee banner announcing the website launch
- **SEO Ready**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Syne (Display) + Space Grotesk (Body)

## 📁 Project Structure

```
plugworks-website/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── ComingSoonBanner.tsx
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Locations.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- `plug-black`: #0A0A0B (Background)
- `plug-dark`: #111113 (Secondary background)
- `plug-gray`: #1A1A1D (Tertiary)
- `plug-light`: #F5F5F7 (Text)
- `plug-electric`: #00E5FF (Primary accent)
- `plug-spark`: #FF6B35 (Secondary accent)
- `plug-glow`: #7B61FF (Tertiary accent)

### Typography
- **Display**: Syne (700-800 weight)
- **Body**: Space Grotesk (300-500 weight)

## 📝 Sections

1. **Coming Soon Banner** - Animated marquee announcing launch
2. **Navigation** - Sticky nav with glass morphism effect
3. **Hero** - Full-screen hero with animated elements
4. **About** - Company introduction with stats
5. **Services** - 6 service cards with hover effects
6. **Locations** - Egypt & UAE office showcase
7. **Contact** - Contact form with info
8. **Footer** - Links and social media

## 📄 License

© 2024 Plugworks. All rights reserved.

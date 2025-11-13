# CodeBridge Labs Landing Page

A modern, professional B2B landing page for **CodeBridge Labs** — bringing world-class computer science education to high schools.

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design inspired by Duolingo × Stripe × Khan Academy
- **Custom Color Palette**: Navy (#0D1B2A), Sky Blue (#3A86FF), Soft Gray (#F3F4F6)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Cards
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Icons**: SVG icons (inline)
- **Deployment Ready**: Optimized for Vercel, Netlify, or any static host

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Landing Page Sections

1. **Hero Section** - Compelling headline with dual CTAs
2. **Problem Section** - Why schools choose CodeBridge (3 pain points)
3. **How It Works** - 3-step process visualization
4. **Courses Section** - 6 course cards with detailed syllabi
5. **Results Section** - Metrics, testimonials, and trust badges
6. **Pricing Section** - Flexible pricing inquiry with CTA
7. **Footer** - Navigation, contact, and legal links

## 🔗 Integration with Education Playground

This landing page sits in front of the **Education_Playground** Jupyter Book site and links to:
- Course catalog and detailed syllabi
- Learning resources and practice materials
- Student assessment tools

## 🎨 Customization

### Colors
Edit `app/globals.css` to change the color palette

### Content
- **Metadata**: `app/layout.tsx`
- **Components**: Individual files in `/components`
- **Links**: Update Calendly and Education_Playground URLs

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

## 📱 Fully Responsive

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

**Built with ❤️ for schools bringing CS education to students everywhere.**

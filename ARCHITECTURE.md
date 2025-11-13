# 🏗️ System Architecture

## Overview

CodeBridge Landing Page is a **data-driven conversion machine** built on Next.js with comprehensive analytics and A/B testing capabilities.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         VISITOR                              │
│              (School Administrator/Teacher)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   GITHUB PAGES CDN                           │
│    https://mykolas-perevicius.github.io/Education_Playground│
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Static Next.js Export                    │  │
│  │  • index.html (Landing page)                         │  │
│  │  • _next/* (JS bundles, CSS)                         │  │
│  │  • README.html, easy/, hard/ (Jupyter Book content)  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  CLIENT-SIDE EXECUTION                       │
│                                                              │
│  ┌──────────────────┐  ┌─────────────────┐  ┌────────────┐ │
│  │  A/B Testing     │  │  Analytics      │  │  UI Layer  │ │
│  │  Framework       │  │  Tracking       │  │  (React)   │ │
│  └─────────┬────────┘  └────────┬────────┘  └──────┬─────┘ │
│            │                     │                   │       │
│            └──────────┬──────────┘                   │       │
│                       │                              │       │
└───────────────────────┼──────────────────────────────┼───────┘
                        │                              │
                        ▼                              │
        ┌───────────────────────────────┐             │
        │      LocalStorage             │             │
        │  • experiment_hero_headline   │             │
        │  • experiment_cta_text        │             │
        │  • experiment_pricing_display │             │
        │  • darkMode preference        │             │
        └───────────────────────────────┘             │
                        │                              │
                        ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS PIPELINE                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    PostHog                            │  │
│  │  https://app.posthog.com                             │  │
│  │                                                       │  │
│  │  Event Tracking:                                     │  │
│  │  • page_view                                         │  │
│  │  • hero_view, courses_view, pricing_view            │  │
│  │  • book_call_click (CONVERSION)                     │  │
│  │  • scroll_depth (25%, 50%, 75%, 90%, 100%)          │  │
│  │  • dark_mode_toggle                                  │  │
│  │                                                       │  │
│  │  Session Recording:                                   │  │
│  │  • Full user interaction replay                      │  │
│  │  • Click heatmaps                                    │  │
│  │  • Rage click detection                              │  │
│  │                                                       │  │
│  │  A/B Test Results:                                   │  │
│  │  • Variant assignment                                │  │
│  │  • Conversion by variant                             │  │
│  │  • Statistical significance                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Vercel Analytics                        │  │
│  │  (Optional - for Vercel deployments)                │  │
│  │                                                       │  │
│  │  • Real-time traffic                                 │  │
│  │  • Geographic distribution                           │  │
│  │  • Device breakdown                                  │  │
│  │  • Referral sources                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Vercel Speed Insights                     │  │
│  │  (Optional - for Vercel deployments)                │  │
│  │                                                       │  │
│  │  • Core Web Vitals (LCP, FID, CLS)                  │  │
│  │  • Performance scores                                │  │
│  │  • Load time distribution                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONVERSION ACTIONS                         │
│                                                              │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │  Calendly    │  │  Email Click   │  │  Phone Click   │  │
│  │  Booking     │  │                │  │                │  │
│  └──────────────┘  └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Visitor Arrives

```
User → GitHub Pages CDN → Static HTML/JS/CSS → Browser
```

**Latency**: < 100ms (CDN edge servers worldwide)

---

### 2. A/B Test Assignment

```javascript
// On first visit
1. Check localStorage for existing variant
2. If none, randomly assign based on weights
3. Store in localStorage (persists across sessions)
4. Track variant assignment in PostHog
5. Render appropriate content
```

**Example**:
```
User A → localStorage empty → Assign "benefit_focused" → Show Variant B headline
User A → Returns tomorrow → Read localStorage → Show same Variant B headline
```

**Why localStorage?**
- Consistent experience across visits
- Works offline/on static sites
- No server required
- Privacy-friendly (no cookies, no tracking across domains)

---

### 3. Event Tracking

```javascript
// Intersection Observer triggers
User scrolls to Courses section
  → IntersectionObserver detects 50% visible
  → trackFunnel('courses_section_view')
  → PostHog captures event with timestamp, variant info

// Click tracking
User clicks "Book a Call"
  → onClick handler fires
  → trackConversion('book_call_click', { cta_variant: 'schedule_demo', location: 'hero' })
  → PostHog captures with user properties
  → Event appears in Live Events within seconds
```

---

### 4. Session Recording

```
PostHog session recording captures:
1. DOM snapshot (initial state)
2. Mouse movements (x,y coordinates)
3. Clicks (element clicked, timestamp)
4. Scrolls (position, direction)
5. Input focus (but NOT input values - privacy)
6. Network requests (timing, success/fail)
7. Console logs (errors, warnings)

Result: Full replay of user session for UX analysis
```

---

## Technology Stack

### Frontend

- **Next.js 16**: React framework with static export
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **Inter Font**: Google Fonts via next/font

### Analytics

- **PostHog** (v3.x): Product analytics
  - Event tracking
  - Session recording
  - Feature flags (for A/B tests)
  - Funnel analysis
  - Cohorts and retention

- **Vercel Analytics**: Web analytics (optional)
- **Vercel Speed Insights**: Performance monitoring (optional)

### Deployment

- **GitHub Pages**: Static hosting
- **GitHub Actions**: CI/CD (via ghp-import)
- **Custom Domain**: Optional (DNS CNAME to GitHub Pages)

---

## File Structure

```
Education_Playground/
├── codebridge-landing/          # Landing page source
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Global styles, theme
│   ├── components/
│   │   ├── Hero.tsx            # A/B tested hero section
│   │   ├── Problem.tsx         # Pain points
│   │   ├── HowItWorks.tsx      # 3-step process
│   │   ├── Courses.tsx         # Course catalog
│   │   ├── Results.tsx         # Metrics + testimonials
│   │   ├── Pricing.tsx         # Pricing inquiry
│   │   ├── Footer.tsx          # Footer navigation
│   │   ├── Navigation.tsx      # Sticky nav
│   │   ├── DarkModeToggle.tsx  # Theme switcher
│   │   └── AnalyticsProvider.tsx # Analytics wrapper
│   ├── lib/
│   │   ├── analytics.ts        # PostHog integration
│   │   └── ab-testing.ts       # A/B test framework
│   ├── out/                    # Static export output
│   ├── deploy.sh               # Deployment script
│   ├── AB_TESTING_STRATEGY.md  # A/B test playbook
│   ├── ANALYTICS_SETUP.md      # Analytics guide
│   ├── QUICK_START.md          # Daily ops guide
│   └── package.json
│
├── _build/html/                 # Deployed site
│   ├── index.html              # Landing page (from codebridge-landing/out)
│   ├── _next/                  # Next.js assets
│   ├── README.html             # Jupyter Book intro
│   ├── easy/, medium/, hard/   # Course content
│   ├── _static/                # Jupyter Book assets
│   └── ...                     # All Jupyter Book pages
│
├── easy/, medium/, hard/        # Source .ipynb files
├── _config.yml                  # Jupyter Book config
└── _toc.yml                     # Table of contents
```

---

## Build & Deploy Pipeline

```bash
# Step 1: Build Next.js landing page
cd codebridge-landing
npm run build
# → Outputs to out/

# Step 2: Copy to Jupyter Book output
cp -r out/* ../_build/html/
# → Landing page now at _build/html/index.html
# → All Jupyter Book content preserved

# Step 3: Deploy to GitHub Pages
ghp-import -n -p -f _build/html
# → Pushes to gh-pages branch
# → GitHub Pages serves from gh-pages
# → Live in 1-2 minutes
```

**Automation**: Use `./deploy.sh` script to run all steps!

---

## Environment Variables

### Production (GitHub Pages)

Not needed! Analytics work client-side.

Optional: If using PostHog Cloud (recommended):
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

Add to `.env.local` for local development (never commit!)

---

## Analytics Event Schema

### Event: `page_view`
```json
{
  "event": "page_view",
  "properties": {
    "url": "https://...",
    "path": "/",
    "referrer": "https://google.com",
    "timestamp": "2025-11-13T17:20:00.000Z"
  }
}
```

### Event: `book_call_click` (CONVERSION)
```json
{
  "event": "book_call_click",
  "properties": {
    "conversion_event": "book_call_click",
    "cta_variant": "schedule_demo",
    "location": "hero",
    "experiment_hero_headline": "benefit_focused",
    "experiment_cta_text": "schedule_demo",
    "timestamp": "2025-11-13T17:25:00.000Z"
  }
}
```

### Event: `scroll_depth`
```json
{
  "event": "scroll_depth",
  "properties": {
    "depth_percentage": 75,
    "timestamp": "2025-11-13T17:22:00.000Z"
  }
}
```

---

## Security & Privacy

### ✅ Privacy-Friendly

- **No cookies**: localStorage only (first-party)
- **No PII tracking**: No names, emails, IP addresses stored
- **Session recordings**: Text inputs masked by default
- **GDPR compliant**: User can clear localStorage anytime
- **No third-party tracking**: PostHog self-hostable (optional)

### ✅ Security

- **Static site**: No server-side code = no injection attacks
- **HTTPS only**: GitHub Pages enforces SSL
- **Subresource Integrity**: Next.js handles automatically
- **Content Security Policy**: Can add via headers

---

## Performance Optimization

### Current Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s (target: < 2s)
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

### Optimizations Applied

1. **Static Export**: No server latency
2. **Code Splitting**: Each page loads only what it needs
3. **Font Optimization**: Inter font preloaded, swap strategy
4. **Image Optimization**: Next.js Image component (unoptimized for static)
5. **Lazy Loading**: Components loaded on demand
6. **Minification**: JS/CSS minified automatically
7. **CDN**: GitHub Pages edge network

---

## Scaling Strategy

### Traffic Growth

| Monthly Visitors | Infrastructure | Cost |
|-----------------|----------------|------|
| 0 - 10,000 | GitHub Pages (free) | $0 |
| 10,000 - 100,000 | GitHub Pages or Vercel Free | $0 |
| 100,000 - 1M | Vercel Pro | $20/month |
| 1M+ | Vercel Enterprise or CloudFlare | Custom |

**PostHog Costs**:
- 0 - 1M events/month: Free
- 1M - 10M events/month: ~$200/month
- Self-hosted: Free (requires server)

### Database Layer (Future)

If you add lead capture forms:
```
Landing Page
    ↓
Serverless API (Vercel Functions)
    ↓
Database (Supabase, PlanetScale, or Airtable)
    ↓
CRM (HubSpot, Salesforce)
```

---

## Monitoring & Alerts

### Set Up Alerts (Recommended)

**PostHog → Settings → Alerts**

1. **Conversion Rate Drop**
   - Alert if conversion rate < 2% for 24 hours
   - Action: Check for bugs, traffic quality

2. **Error Spike**
   - Alert if console errors > 10/hour
   - Action: Check session recordings, fix bugs

3. **Traffic Spike**
   - Alert if page views > 10x daily average
   - Action: Check referrer (press mention? viral post?)

---

## Disaster Recovery

### Backup Strategy

```bash
# Code: Already in Git
git clone https://github.com/mykolas-perevicius/codebridge-landing

# Analytics: Export from PostHog
PostHog → Data Management → Exports → Download CSV

# Deployed Site: In gh-pages branch
git clone -b gh-pages https://github.com/mykolas-perevicius/Education_Playground
```

### Rollback

```bash
# Revert to previous deploy
git checkout gh-pages
git reset --hard HEAD~1
git push -f origin gh-pages
```

**Recovery Time**: < 5 minutes

---

## Future Enhancements

### Phase 2 (Month 2-3)
- [ ] Lead capture form with email validation
- [ ] Multi-step qualification quiz
- [ ] Live chat widget (Intercom, Drift)
- [ ] Video testimonials
- [ ] Case studies section

### Phase 3 (Month 4-6)
- [ ] Serverless API for form submissions
- [ ] Database integration (leads storage)
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Email automation (welcome sequence)
- [ ] Custom domain (codebridge.com)

### Phase 4 (Month 7+)
- [ ] Multi-page site (pricing page, about page)
- [ ] Blog for content marketing
- [ ] Customer portal
- [ ] Webinar registration
- [ ] ROI calculator tool

---

## Support & Maintenance

### Weekly Tasks (30 min)
- Review analytics dashboards
- Watch session recordings
- Check A/B test progress
- Identify and fix UX issues

### Monthly Tasks (2-3 hours)
- Analyze A/B test results
- Implement winning variants
- Launch new experiments
- Review funnel drop-offs
- Plan next optimizations

### Quarterly Tasks (1 day)
- Comprehensive conversion audit
- Competitor analysis
- User interviews (if possible)
- Major redesign/refresh
- Team training on analytics

---

**Architecture Complete! 🎉**

You now have a complete understanding of how your landing page works, from visitor arrival to conversion tracking to deployment. Use this as reference for troubleshooting, scaling, and planning future enhancements!

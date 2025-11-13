# Analytics & A/B Testing Setup Guide

## 📊 Overview

CodeBridge landing page includes comprehensive analytics, funnel tracking, and A/B testing capabilities using:

- **PostHog**: Open-source product analytics with session recording
- **Vercel Analytics**: Real-time traffic and performance monitoring
- **Vercel Speed Insights**: Core Web Vitals tracking
- **Custom Funnel Tracking**: User journey visualization
- **A/B Testing**: Multiple experiment variants

## 🚀 Quick Setup

### 1. PostHog Setup (Free)

1. **Sign up** at [https://app.posthog.com/signup](https://app.posthog.com/signup)
2. Create a new project
3. Copy your **Project API Key** from Project Settings
4. Add to your `.env.local` file:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 2. Vercel Setup (Automatic)

Vercel Analytics and Speed Insights are automatically enabled when you deploy to Vercel. No additional configuration needed!

## 📈 Features Included

### Funnel Tracking

Automatically tracks user journey through these stages:

1. **Page View** - Initial landing
2. **Hero View** - Above-the-fold engagement
3. **Problem Section** - Pain point awareness
4. **How It Works** - Process understanding
5. **Courses** - Product interest
6. **Results** - Social proof engagement
7. **Pricing** - Purchase intent

### Conversion Events

Tracks all critical actions:

- **Book Call Click** - Primary CTA
- **Download Catalog** - Lead magnet
- **View Syllabus** - Course interest
- **Email Click** - Contact intent
- **Phone Click** - Direct contact
- **Social Click** - Brand engagement

### User Interactions

Monitors engagement:

- **Dark Mode Toggle** - Preference tracking
- **Mobile Menu** - Navigation patterns
- **Course Card Hover** - Interest signals
- **Scroll Depth** - Content consumption (25%, 50%, 75%, 90%, 100%)
- **Time on Page** - Engagement duration
- **Time per Section** - Content effectiveness

### A/B Testing Experiments

Three active experiments:

#### 1. Hero Headline Test
- **Variants**:
  - `original`: "Bring Modern Computer Science to Your School"
  - `benefit_focused`: "Launch CS Classes in 48 Hours — No Hiring Required"
  - `question_format`: "Want to Offer CS but Don't Have the Teachers?"

#### 2. CTA Text Test
- **Variants**:
  - `book_call`: "Book an Information Call"
  - `schedule_demo`: "Schedule a Demo"
  - `get_started`: "Get Started Today"

#### 3. Pricing Display Test
- **Variants**:
  - `inquiry_only`: Contact-only pricing
  - `range_shown`: Display starting price range

## 🎯 Viewing Your Data

### PostHog Dashboard

Access your analytics at [https://app.posthog.com](https://app.posthog.com)

**Key Dashboards to Create:**

1. **Conversion Funnel**
   - Path: page_view → hero_view → courses_view → book_call_click
   - Shows drop-off at each stage

2. **A/B Test Results**
   - Compare conversion rates by variant
   - Filter by `experiment_hero_headline`, `experiment_cta_text`, etc.

3. **User Journey**
   - Session recordings show actual user behavior
   - Click heatmaps reveal engagement patterns

### Creating PostHog Funnels

```
1. Go to "Insights" → "New Insight" → "Funnel"
2. Add steps:
   - Step 1: page_view
   - Step 2: hero_view
   - Step 3: pricing_section_view
   - Step 4: book_call_click
3. Add breakdown by: experiment_hero_headline
4. Compare conversion rates across variants
```

### Vercel Analytics

Access at `https://vercel.com/your-team/codebridge-landing/analytics`

Shows:
- Real-time visitors
- Top pages
- Referral sources
- Geographic distribution

## 🧪 Testing Your Setup

### 1. Verify Analytics Are Working

Open your browser console and check for:
```
PostHog initialized successfully
```

### 2. Test Event Tracking

```javascript
// Open browser console
window.posthog.capture('test_event', { test: true })
```

Check PostHog dashboard → Live Events to see it appear.

### 3. Force A/B Test Variant

```javascript
// Open browser console
localStorage.setItem('experiment_hero_headline', 'benefit_focused')
// Reload page
```

### 4. View Active Experiments

```javascript
// Open browser console
const keys = Object.keys(localStorage)
  .filter(k => k.startsWith('experiment_'));
keys.forEach(k => console.log(k, localStorage.getItem(k)));
```

## 📊 Key Metrics to Track

### Conversion Rate
- **Formula**: (book_call_clicks / page_views) × 100
- **Target**: 5-10% for B2B landing pages
- **Track by**: Experiment variant, traffic source, device type

### Funnel Drop-off
- Identify where users leave
- Optimize weakest stages first
- A/B test improvements

### Engagement
- **Scroll Depth**: Target 75%+ reach pricing
- **Time on Page**: Target 2+ minutes
- **Section Views**: Which content resonates

### A/B Test Winners
- **Minimum Sample**: 100 conversions per variant
- **Statistical Significance**: p < 0.05
- **Lift**: >10% improvement to justify change

## 🔧 Advanced Configuration

### Add Custom Events

Edit `lib/analytics.ts`:

```typescript
export enum CustomEvent {
  VIDEO_PLAY = 'video_play',
  CALCULATOR_USE = 'calculator_use',
  // Add your events
}
```

Track in components:

```typescript
import { trackInteraction, InteractionEvent } from '@/lib/analytics';

const handleVideoPlay = () => {
  trackInteraction(InteractionEvent.VIDEO_PLAY, {
    video_id: 'intro_video',
    timestamp: Date.now(),
  });
};
```

### Add New A/B Tests

Edit `lib/ab-testing.ts`:

```typescript
export const EXPERIMENTS = {
  // Add new experiment
  TESTIMONIAL_STYLE: {
    name: 'testimonial_style',
    variants: ['cards', 'quotes', 'video'],
    weights: [0.33, 0.33, 0.34],
  },
};
```

Add variant configs:

```typescript
export const VARIANT_CONFIGS = {
  testimonial_style_cards: {
    layout: 'grid',
    showImages: true,
  },
  // Add configs for each variant
};
```

Use in component:

```typescript
const { variant, config } = useExperiment(EXPERIMENTS.TESTIMONIAL_STYLE);
```

### Session Recording Privacy

PostHog automatically masks sensitive data. To customize:

```typescript
// In lib/analytics.ts
posthog.init(apiKey, {
  session_recording: {
    maskAllInputs: true,  // Mask all input fields
    maskTextSelector: '.sensitive',  // Mask specific elements
  },
});
```

## 📱 GDPR Compliance

PostHog is GDPR-compliant by default:
- No PII collected without consent
- Data stored in EU (if using EU cloud)
- User opt-out supported

Add cookie consent banner if needed (recommend: cookieyes.com)

## 🐛 Troubleshooting

### Analytics Not Loading

1. Check browser console for errors
2. Verify API key in `.env.local`
3. Check PostHog project is active
4. Verify no ad blockers blocking PostHog

### Events Not Appearing

1. Check PostHog Live Events view
2. Verify event name spelling
3. Check browser console for errors
4. Test with `window.posthog.capture('test')`

### A/B Tests Not Changing

1. Clear localStorage: `localStorage.clear()`
2. Open in incognito window
3. Check variant assignment in localStorage
4. Verify experiment config in `lib/ab-testing.ts`

## 📚 Resources

- [PostHog Documentation](https://posthog.com/docs)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [A/B Testing Best Practices](https://vwo.com/ab-testing/)
- [Funnel Analysis Guide](https://mixpanel.com/topics/what-is-funnel-analysis/)

## 💡 Pro Tips

1. **Test One Thing at a Time**: Don't run competing experiments on same page elements
2. **Let Tests Run**: Minimum 1-2 weeks for statistical significance
3. **Segment Your Data**: Compare mobile vs desktop, new vs returning
4. **Watch Session Recordings**: See real user behavior, not just numbers
5. **Set Up Alerts**: Get notified of conversion rate drops
6. **Export Data**: Download for deeper analysis in SQL/Python

---

**Need Help?**
- PostHog Community: [https://posthog.com/questions](https://posthog.com/questions)
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)

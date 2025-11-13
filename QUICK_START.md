# 🚀 Quick Start Guide - CodeBridge Landing Page

## 🎯 You're Live!

**Landing Page**: https://mykolas-perevicius.github.io/Education_Playground/

**Status**: ✅ Deployed and tracking users

---

## ⚡ 5-Minute Setup Checklist

### 1. Set Up Analytics (Critical!)

```bash
# Sign up for PostHog (free)
1. Go to: https://app.posthog.com/signup
2. Create project: "CodeBridge Landing"
3. Copy API key from Project Settings
```

Add to Vercel (if deploying there) or local `.env.local`:
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Redeploy after adding env vars!**

---

### 2. Create Your First PostHog Funnel

```
PostHog Dashboard → Insights → New Insight → Funnel

Add steps:
1. page_view
2. hero_view
3. pricing_section_view
4. book_call_click

Save as: "Landing Page Conversion Funnel"
```

**What you'll see**: Exact drop-off rates at each stage!

---

### 3. Enable Session Recordings

```
PostHog → Settings → Session Recording → Enable

Settings:
✅ Record sessions
✅ Record network performance
✅ Record console logs
❌ Mask all text inputs (privacy)
```

**Watch your first visitor**: See exactly how real users interact with your page!

---

### 4. Update Contact Info

Edit these files to add your real contact details:

**File**: `components/Hero.tsx`
```typescript
// Line 82: Update Calendly URL
href="https://calendly.com/YOUR-ACTUAL-LINK"
```

**File**: `components/Footer.tsx`
```typescript
// Line 113: Update email
href="mailto:YOUR-REAL-EMAIL@codebridge.com"

// Line 122: Update phone
<span>YOUR-REAL-PHONE</span>
```

**Redeploy**: `./deploy.sh`

---

## 📊 Daily Monitoring (5 minutes/day)

### Morning Check (2 min)

```
1. PostHog → Live Events
   - How many page_views yesterday?
   - Any book_call_clicks?
   - Conversion rate trend up/down?

2. PostHog → Session Recordings
   - Watch 2-3 recent sessions
   - Any UX issues? Broken links? Confusion?
```

### Weekly Deep Dive (30 min)

```
1. Check funnel drop-off rates
   - Which stage losing most users?
   - Any trends over time?

2. Review A/B test results
   - Enough data yet? (100+ conversions per variant)
   - Clear winner emerging?

3. Watch 10-15 session recordings
   - Common pain points?
   - Unexpected behavior?
   - Mobile issues?

4. Export conversion data
   - PostHog → Insights → Export to CSV
   - Analyze in Excel/Sheets
```

---

## 🔧 Making Changes

### Update Content

```bash
cd /home/myko/Education_Playground/codebridge-landing

# Edit any component:
nano components/Hero.tsx
nano components/Courses.tsx
# etc.

# Deploy:
./deploy.sh
```

**Changes go live in 1-2 minutes!**

---

### Add New A/B Test

**File**: `lib/ab-testing.ts`

```typescript
// Add new experiment
export const EXPERIMENTS = {
  // ... existing experiments

  MY_NEW_TEST: {
    name: 'my_new_test',
    variants: ['control', 'variant_a', 'variant_b'],
    weights: [0.34, 0.33, 0.33],
  },
};

// Add variant configs
export const VARIANT_CONFIGS = {
  // ... existing configs

  my_new_test_control: {
    // Your control config
  },
  my_new_test_variant_a: {
    // Variant A config
  },
  my_new_test_variant_b: {
    // Variant B config
  },
};
```

**Use in component**:
```typescript
import { EXPERIMENTS, useExperiment } from '@/lib/ab-testing';

const { variant, config } = useExperiment(EXPERIMENTS.MY_NEW_TEST);
```

---

### Track Custom Event

```typescript
import { trackConversion, ConversionEvent } from '@/lib/analytics';

const handleCustomAction = () => {
  trackConversion(ConversionEvent.YOUR_EVENT, {
    custom_property: 'value',
    user_segment: 'high_intent',
  });
};
```

**View in PostHog**: Events → Filter by event name

---

## 🎨 Customization Checklist

- [ ] Update Calendly link (Hero.tsx)
- [ ] Update email address (Footer.tsx)
- [ ] Update phone number (Footer.tsx)
- [ ] Add real testimonials (Results.tsx)
- [ ] Update course links (Courses.tsx)
- [ ] Set up PostHog analytics
- [ ] Create conversion funnel
- [ ] Enable session recording
- [ ] Review first 10 recordings
- [ ] Set up A/B test tracking

---

## 🐛 Troubleshooting

### "Analytics not tracking"

1. Check browser console for errors
2. Verify PostHog API key in environment
3. Disable ad blockers
4. Test in incognito mode

```javascript
// Test manually in browser console:
window.posthog.capture('test_event', { test: true })
```

### "A/B tests not changing"

```javascript
// Clear localStorage in browser console:
localStorage.clear()

// Or force specific variant:
localStorage.setItem('experiment_hero_headline', 'benefit_focused')
```

### "Changes not showing up"

1. Clear browser cache (Ctrl+Shift+R)
2. Wait 2 minutes (GitHub Pages propagation)
3. Check gh-pages branch was updated:
   ```bash
   git log origin/gh-pages -1
   ```

---

## 📈 What to Track

### Key Metrics

| Metric | How to Check | Target |
|--------|--------------|--------|
| **Page Views** | PostHog → Trends → page_view | 1,000+/month |
| **Conversion Rate** | book_call_clicks / page_views × 100 | 3-5% |
| **Avg Time on Page** | PostHog → Session Duration | 2+ minutes |
| **Scroll to Pricing** | pricing_section_view / page_view × 100 | 60%+ |
| **Mobile Traffic** | PostHog → Device Type | Track for optimization |

### Red Flags 🚩

- **Conversion rate < 1%**: UX problem or traffic quality issue
- **Bounce rate > 70%**: Messaging mismatch or slow load time
- **Avg time < 30 seconds**: Not engaging, need better hook
- **Session errors**: Broken functionality, investigate immediately

---

## 💡 Pro Tips

1. **Watch Sessions Weekly**: You'll spot issues analytics won't show
2. **Test One Thing at a Time**: Multiple changes = can't tell what worked
3. **Let Tests Run**: Minimum 1 week, 100 conversions per variant
4. **Segment Your Data**: Mobile vs desktop, source, time of day
5. **Act on Insights**: Data without action = wasted opportunity

---

## 🎓 Learning Resources

- **PostHog Docs**: https://posthog.com/docs
- **A/B Testing Guide**: See `AB_TESTING_STRATEGY.md`
- **Analytics Setup**: See `ANALYTICS_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`

---

## 🆘 Get Help

- **PostHog Community**: https://posthog.com/questions
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Open issue in your repo

---

## 🎯 Your First Week Action Plan

### Day 1 (Today!)
- ✅ Site is live
- ⏳ Set up PostHog (30 min)
- ⏳ Create conversion funnel (5 min)
- ⏳ Enable session recording (2 min)
- ⏳ Update contact info (10 min)

### Day 2-7
- Watch 2-3 session recordings daily
- Note any UX issues or confusing sections
- Check conversion rate trend
- Share site with 5-10 people for feedback

### Week 2
- Review A/B test data (need ~50 conversions minimum)
- Identify funnel drop-off stage
- Plan optimization for weakest stage
- Launch next experiment

### Month 1 Goal
- 100+ page views
- 3-5% conversion rate
- Clear winner in headline test
- 2-3 UX improvements implemented
- 1 new experiment running

---

**You're all set! 🎉**

Your landing page is live, analytics are ready, and you're set up to optimize for conversions. Start small, test often, and let the data guide you! 🚀

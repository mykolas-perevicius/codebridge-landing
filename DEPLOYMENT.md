# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to** [https://vercel.com/new](https://vercel.com/new)

2. **Import your GitHub repository**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Find `codebridge-landing`
   - Click "Import"

3. **Configure**:
   - **Project Name**: `codebridge-landing` (or your choice)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables** (Optional but recommended):
   ```
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
   *(Get PostHog API key from [app.posthog.com](https://app.posthog.com))*

5. **Click "Deploy"** 🎉

Your site will be live at: `https://codebridge-landing.vercel.app` (or custom domain)

**Deployment takes ~2-3 minutes**

---

### Option 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Your account
# - Link to existing project: N
# - Project name: codebridge-landing
# - Directory: ./
# - Override settings: N
```

---

## 🔧 Post-Deployment Setup

### 1. Configure Analytics

#### PostHog Setup (5 minutes)

1. Sign up at [https://app.posthog.com/signup](https://app.posthog.com/signup)
2. Create a new project: "CodeBridge Landing"
3. Copy your **Project API Key**
4. In Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     Name: NEXT_PUBLIC_POSTHOG_KEY
     Value: phc_your_api_key_here
     ```
   - Add:
     ```
     Name: NEXT_PUBLIC_POSTHOG_HOST
     Value: https://app.posthog.com
     ```
   - Click "Save"
5. Redeploy your site (Vercel → Deployments → Click "..." → Redeploy)

#### Vercel Analytics (Automatic)

- Enabled automatically on all Vercel deployments
- View at: `https://vercel.com/your-team/codebridge-landing/analytics`

### 2. Set Up Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your domain: `landing.codebridge.com` or `codebridge.com`
3. Follow DNS configuration instructions
4. SSL certificate auto-generated

---

## 📊 Verify Everything Works

### 1. Test Analytics

1. Visit your deployed site
2. Open browser console (F12)
3. Look for: `PostHog initialized successfully`
4. Click a CTA button
5. Check PostHog Dashboard → Live Events

### 2. Test A/B Testing

1. Visit site in incognito window (fresh session)
2. Refresh multiple times
3. You should see different headlines/CTAs
4. Check localStorage in console:
   ```javascript
   Object.keys(localStorage)
     .filter(k => k.startsWith('experiment_'))
   ```

### 3. Test Funnel Tracking

1. Scroll through entire page
2. Click CTAs
3. Check PostHog → Live Events → Filter by "funnel"
4. Should see: page_view, hero_view, courses_view, etc.

---

## 🌐 Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Follow prompts, publish directory: .next
```

### GitHub Pages (Static Export)

1. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     basePath: '/codebridge-landing',
   };
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Deploy `.next` folder to GitHub Pages

---

## 🔄 Continuous Deployment

Vercel automatically deploys on every git push to `main`:

```bash
# Make changes
git add .
git commit -m "Update landing page"
git push origin main

# Vercel deploys automatically!
# Check status: https://vercel.com/your-team/codebridge-landing/deployments
```

**Preview Deployments**: Every branch gets a unique URL for testing

---

## 🐛 Troubleshooting Deployment

### Build Fails

**Error**: "Module not found"
- **Fix**: Run `npm install` locally and commit `package-lock.json`

**Error**: "Type error in component"
- **Fix**: Run `npm run build` locally to catch errors
- Fix TypeScript errors before pushing

### Analytics Not Working

**PostHog events not showing**
- Verify API key in Environment Variables
- Check browser console for errors
- Disable ad blockers
- Try incognito mode

**Vercel Analytics empty**
- Wait 24 hours for data to accumulate
- Verify Analytics is enabled in Project Settings

### Site Loading Slowly

- Check Vercel Speed Insights for bottlenecks
- Optimize images with Next.js Image component
- Review PostHog session recordings for UX issues

---

## 📈 Monitoring & Maintenance

### Daily Checks

1. **Vercel Analytics**: Traffic, errors, performance
2. **PostHog Live Events**: Real-time user activity
3. **Conversion Funnel**: Drop-off rates

### Weekly Reviews

1. **A/B Test Results**: Statistical significance reached?
2. **Top Conversion Paths**: What's working?
3. **Session Recordings**: UX improvements needed?

### Monthly Actions

1. **Implement winning A/B test variants**
2. **Launch new experiments**
3. **Review and optimize slowest pages**

---

## 🔐 Security Best Practices

✅ **Do**:
- Keep environment variables in Vercel dashboard only
- Never commit `.env.local` to git
- Use `.env.local.example` for documentation
- Regenerate API keys if accidentally exposed

❌ **Don't**:
- Expose API keys in client-side code
- Commit sensitive data to GitHub
- Use production keys in local development

---

## 📞 Get Help

- **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
- **PostHog Community**: [https://posthog.com/questions](https://posthog.com/questions)
- **GitHub Issues**: [https://github.com/mykolas-perevicius/codebridge-landing/issues](https://github.com/mykolas-perevicius/codebridge-landing/issues)

---

## 🎉 You're Live!

Your CodeBridge Labs landing page is now:
- ✅ Deployed and accessible worldwide
- ✅ Tracking every user interaction
- ✅ Running A/B tests automatically
- ✅ Optimized for conversions
- ✅ Auto-deploying on every push

**Next Steps**:
1. Share your live URL with stakeholders
2. Set up PostHog funnels (see ANALYTICS_SETUP.md)
3. Monitor conversion rates
4. Launch to your target audience! 🚀

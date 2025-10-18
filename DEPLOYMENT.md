# 🚀 Deployment Guide - Aura Expense Analyzer

This guide will help you deploy your full-stack expense scheduler application to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- Supabase account (for backend)
- Domain name (optional)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented
3. Test the build locally: `npm run build`

### Step 2: Deploy to Vercel
1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Set Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-app.vercel.app`

### Step 3: Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed
4. Enable SSL (automatic with Vercel)

## 🗄️ Backend Deployment (Supabase)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `aura-expense-analyzer`
   - Database Password: (generate strong password)
   - Region: Choose closest to your users

### Step 2: Set Up Database
1. **Run Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Push migrations
   supabase db push
   ```

2. **Configure Row Level Security**
   - Go to Authentication → Policies
   - Enable RLS on all tables
   - Verify policies are working

### Step 3: Set Up Edge Functions
1. **Deploy AI Functions**
   ```bash
   # Deploy analyze-expenses function
   supabase functions deploy analyze-expenses
   
   # Deploy chat-assistant function
   supabase functions deploy chat-assistant
   ```

2. **Configure Environment Variables**
   In Supabase dashboard → Settings → Edge Functions:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

### Step 4: Configure Authentication
1. Go to Authentication → Settings
2. Configure site URL: `https://your-app.vercel.app`
3. Add redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:5173/auth/callback` (for development)

## 🔧 Environment Variables

### Frontend (.env.local)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (Supabase)
```env
OPENAI_API_KEY=sk-your-openai-key
```

## 🚀 Production Checklist

### Pre-Deployment
- [ ] All features tested locally
- [ ] Build passes without errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Edge functions deployed

### Post-Deployment
- [ ] Test user registration/login
- [ ] Verify expense creation
- [ ] Check AI features working
- [ ] Test theme switching
- [ ] Verify mobile responsiveness
- [ ] Check analytics and charts
- [ ] Test reminder system
- [ ] Verify calendar integration

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Enable Vercel Analytics in dashboard
2. Monitor performance metrics
3. Track user engagement

### Supabase Monitoring
1. Monitor database performance
2. Check Edge Function logs
3. Set up alerts for errors

## 🔒 Security Considerations

### Database Security
- [ ] RLS policies properly configured
- [ ] No sensitive data in client code
- [ ] API keys secured
- [ ] CORS properly configured

### Application Security
- [ ] HTTPS enabled
- [ ] Secure authentication flow
- [ ] Input validation on all forms
- [ ] Rate limiting on API calls

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Database Connection Issues**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure migrations are applied

**AI Features Not Working**
- Verify OpenAI API key
- Check Edge Function logs
- Ensure functions are deployed

**Authentication Issues**
- Check redirect URLs
- Verify site URL configuration
- Clear browser cache

### Performance Optimization

**Frontend**
- Enable Vercel's edge caching
- Optimize images
- Use code splitting
- Minimize bundle size

**Backend**
- Optimize database queries
- Use database indexes
- Monitor Edge Function performance
- Implement caching where appropriate

## 📈 Scaling Considerations

### Database Scaling
- Monitor connection limits
- Consider read replicas for analytics
- Implement connection pooling

### Application Scaling
- Use Vercel's automatic scaling
- Monitor Edge Function limits
- Consider CDN for static assets

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 Mobile Deployment

### PWA Configuration
1. Add service worker
2. Configure manifest.json
3. Enable offline capabilities
4. Test on mobile devices

### App Store Deployment (Future)
- React Native conversion
- iOS App Store submission
- Google Play Store submission

## 🌍 International Deployment

### Multi-Region Setup
- Deploy to multiple Vercel regions
- Use Supabase's global CDN
- Configure edge functions per region

### Localization
- Add i18n support
- Translate UI components
- Localize currency and dates

## 📊 Analytics & Monitoring

### User Analytics
- Track user engagement
- Monitor feature usage
- Analyze user behavior

### Performance Monitoring
- Monitor Core Web Vitals
- Track API response times
- Monitor database performance

## 🔧 Maintenance

### Regular Tasks
- Update dependencies
- Monitor security vulnerabilities
- Backup database regularly
- Review and optimize queries

### Monitoring Alerts
- Set up error tracking
- Monitor API usage
- Track performance metrics
- Monitor security events

---

**Your Aura Expense Analyzer is now ready for production! 🚀**



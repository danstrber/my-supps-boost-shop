
# Hosting Your Application: Complete Guide

This guide covers multiple deployment options for hosting your React application with Supabase backend.

## Table of Contents
1. [Netlify Deployment](#netlify-deployment)
2. [Vercel Deployment](#vercel-deployment)
3. [Custom Domain Setup](#custom-domain-setup)
4. [Environment Variables](#environment-variables)
5. [Build Configuration](#build-configuration)
6. [Supabase Configuration](#supabase-configuration)
7. [Troubleshooting](#troubleshooting)

## Netlify Deployment

### Option 1: Deploy from Git Repository

1. **Connect your GitHub repository:**
   - Go to [Netlify](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository

2. **Configure build settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18 (in Environment variables as NODE_VERSION=18)
   ```

3. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_VERSION=18
   ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - You'll get a unique URL like `https://amazing-app-123.netlify.app`

### Option 2: Manual Deploy

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy the dist folder:**
   - Go to Netlify dashboard
   - Drag and drop the `dist` folder onto the deployment area
   - Your site will be live instantly

### Netlify-specific Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Vercel Deployment

### Deploy from GitHub

1. **Connect repository:**
   - Go to [Vercel](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository

2. **Configure project:**
   - Framework Preset: Vite
   - Root Directory: `./` (if deploying from root)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables:**
   - Add in project settings:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a URL like `https://your-app.vercel.app`

### Vercel CLI Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

### Vercel Configuration

Create a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Custom Domain Setup

### For Netlify

1. **Add custom domain:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `mystore.com`)

2. **Configure DNS:**
   - Add CNAME record pointing to your Netlify URL
   - Or use Netlify's nameservers for full DNS management

3. **SSL Certificate:**
   - Netlify provides free SSL automatically
   - Certificate will be provisioned within minutes

### For Vercel

1. **Add domain:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **DNS Configuration:**
   - Add A record: `185.199.108.153`
   - Add CNAME record for www: `cname.vercel-dns.com`

3. **SSL:**
   - Automatic SSL certificate provisioning
   - Usually takes 5-10 minutes

## Environment Variables

### Required Variables

Create a `.env.example` file in your project:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA-XXXXXXXXX

# Optional: Payment Processing
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Environment-specific Variables

**Development (.env.local):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_ENV=development
```

**Production (Platform settings):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_ENV=production
```

## Build Configuration

### Optimized Vite Config

Update your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### Package.json Scripts

Ensure you have these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## Supabase Configuration

### URL Configuration in Supabase

1. **Go to Supabase Dashboard:**
   - Navigate to Authentication → URL Configuration

2. **Set Site URL:**
   ```
   Production: https://yourdomain.com
   Development: http://localhost:5173
   ```

3. **Add Redirect URLs:**
   ```
   https://yourdomain.com
   https://www.yourdomain.com
   https://your-app.netlify.app
   https://your-app.vercel.app
   http://localhost:5173
   ```

### Database Security

1. **Enable RLS on all tables:**
   ```sql
   ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
   ```

2. **Create proper policies:**
   ```sql
   CREATE POLICY "Users can view own data" ON your_table
   FOR SELECT USING (auth.uid() = user_id);
   ```

### API Rate Limits

Configure rate limiting in Supabase:
- Go to Settings → API
- Configure rate limits based on your plan
- Monitor usage in the dashboard

## Troubleshooting

### Common Issues

1. **Build Fails:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working:**
   - Ensure variables start with `VITE_`
   - Restart development server after changes
   - Check platform-specific environment variable settings

3. **Routing Issues (404 on refresh):**
   - Ensure redirect rules are configured
   - For Netlify: Add `_redirects` file
   - For Vercel: Use `vercel.json` rewrites

4. **Supabase Connection Issues:**
   - Verify URL and keys are correct
   - Check CORS settings in Supabase
   - Ensure RLS policies allow access

### Performance Optimization

1. **Image Optimization:**
   ```typescript
   // Use WebP format
   // Implement lazy loading
   // Add proper sizing attributes
   ```

2. **Code Splitting:**
   ```typescript
   // Use React.lazy for route components
   const HomePage = React.lazy(() => import('./pages/HomePage'))
   ```

3. **Bundle Analysis:**
   ```bash
   npm install --save-dev vite-bundle-analyzer
   npm run build
   npx vite-bundle-analyzer
   ```

### Monitoring and Analytics

1. **Add Error Tracking:**
   ```bash
   npm install @sentry/react
   ```

2. **Performance Monitoring:**
   - Use Web Vitals
   - Monitor Core Web Vitals
   - Set up alerts for performance regressions

3. **SEO Optimization:**
   - Add proper meta tags
   - Implement structured data
   - Optimize for mobile devices

### Security Checklist

- [ ] Environment variables properly configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Content Security Policy headers configured
- [ ] RLS enabled on all Supabase tables
- [ ] API rate limiting configured
- [ ] Regular security audits scheduled

## Next Steps

After deployment:

1. **Test thoroughly** on the production URL
2. **Monitor performance** and fix any issues
3. **Set up monitoring** and error tracking
4. **Configure backups** for your database
5. **Plan for scaling** as your user base grows

For additional help, consult the official documentation:
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)

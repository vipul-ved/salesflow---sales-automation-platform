# Deployment Guide: GitHub & Vercel with Supabase

## Step-by-Step Production Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Build SalesFlow AI SaaS"
git push origin main
```

### 2. Connect Supabase
1. Create a Supabase Project at [supabase.com](https://supabase.com).
2. Copy the PostgreSQL Connection String (`DATABASE_URL`) and Direct Migration URL (`DIRECT_URL`).

### 3. Deploy to Vercel
1. Import repository on Vercel.
2. Add Environment Variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
3. Deploy! Vercel automatically runs `npm run build` and serves your live production AI CRM SaaS.

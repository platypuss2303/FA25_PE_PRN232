# 🚀 Post Management App - Deployment Guide

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (ASP.NET Core + Docker)
- **Database**: Render PostgreSQL (already configured)
- **Images**: Cloudinary (already configured)

---

## 🔧 STEP 1: Deploy Backend to Render

### 1.1 Push Code to GitHub
```bash
# If not already done
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin https://github.com/your-username/PRN232-PE_TEST
git push -u origin main
```

### 1.2 Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Select the repository: `PRN232-PE_TEST`
6. Render will automatically detect the `render.yaml` file
7. Click "Apply" to deploy

### 1.3 Backend URL
After deployment, your backend will be available at:
```
https://postmanagement-api.onrender.com
```

---

## 🎯 STEP 2: Deploy Frontend to Vercel

### 2.1 Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2.2 Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select the `frontend` folder as root directory
6. Set Environment Variables:
   - `VITE_API_URL`: `https://postmanagement-api.onrender.com`
7. Deploy!

### 2.3 Deploy via CLI (Alternative)
```bash
cd frontend
vercel --prod
```

### 2.4 Frontend URL
Your frontend will be available at:
```
https://your-app-name.vercel.app
```

---

## ⚙️ STEP 3: Configuration Checklist

### Backend (Render)
✅ Dockerfile configured for Render
✅ Environment variables set:
  - `ASPNETCORE_ENVIRONMENT=Production`
  - `PORT=10000`
  - `ConnectionStrings__Default` (PostgreSQL)
  - `Cloudinary__*` (Image upload)

### Frontend (Vercel)
✅ `vercel.json` configuration file
✅ Environment variables:
  - `VITE_API_URL=https://postmanagement-api.onrender.com`
✅ SPA routing configured

### CORS (Backend)
✅ CORS already configured for all origins in `Program.cs`

---

## 🧪 STEP 4: Testing Deployment

### 4.1 Test Backend API
```bash
curl https://postmanagement-api.onrender.com
curl https://postmanagement-api.onrender.com/api/posts
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Test all features:
   - View posts
   - Create post
   - Upload image
   - Edit/Delete posts

---

## 🐛 Troubleshooting

### Common Issues:

**1. Backend fails to start**
- Check Render logs
- Verify environment variables
- Check database connection

**2. Frontend can't connect to API**
- Verify `VITE_API_URL` environment variable
- Check CORS settings
- Check network requests in browser DevTools

**3. Image upload not working**
- Verify Cloudinary credentials
- Check backend logs for upload errors

**4. Database connection issues**
- Verify PostgreSQL connection string
- Check database is running on Render

---

## 📊 Deployment Costs

### Render (Backend + Database)
- **Free Tier**: Limited hours/month
- **Starter**: $7/month (recommended)

### Vercel (Frontend)
- **Hobby**: Free (perfect for this project)
- **Pro**: $20/month (for commercial use)

### Cloudinary (Images)
- **Free Tier**: 25GB storage, good for testing
- **Paid Plans**: Start from $99/month

---

## 🔄 Continuous Deployment

Both platforms support automatic deployment:
- **Render**: Auto-deploys on git push to main branch
- **Vercel**: Auto-deploys on git push to main branch

---

## 📝 Post-Deployment

### Update DNS (Optional)
1. Buy custom domain
2. Configure in Vercel dashboard
3. Update CORS settings if needed

### Monitoring
- **Render**: Built-in monitoring
- **Vercel**: Analytics available
- **Cloudinary**: Usage dashboard

### Backup
- Database: Render provides automatic backups
- Code: Already on GitHub
- Images: Stored on Cloudinary

---

## 🎉 Deployment Complete!

Your Post Management app is now live:
- **Frontend**: https://your-app-name.vercel.app
- **Backend**: https://postmanagement-api.onrender.com
- **API Docs**: https://postmanagement-api.onrender.com/swagger
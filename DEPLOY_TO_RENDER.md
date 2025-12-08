# Deploy EduFun to Render

This guide will help you deploy your EduFun application to Render using Docker.

## Prerequisites

1. A [Render](https://render.com) account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Using render.yaml (Recommended - Automatic Setup)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin master
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file and configure everything

3. **Deploy**
   - Click "Apply" to create the service
   - Render will build your Docker image and deploy automatically
   - Your app will be available at: `https://edufun.onrender.com` (or similar)

### Option 2: Manual Setup

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Docker configuration"
   git push origin master
   ```

2. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the Service**
   - **Name**: edufun (or your preferred name)
   - **Region**: Oregon (US West) or your preferred region
   - **Branch**: master (or main)
   - **Runtime**: Docker
   - **Instance Type**: Free (or your preferred plan)

4. **Environment Variables** (Optional)
   Add any environment variables if needed:
   - `NODE_ENV`: production (already set in Dockerfile)
   - `PORT`: Will be automatically set by Render

5. **Deploy**
   - Click "Create Web Service"
   - Render will:
     - Build your Docker image using the Dockerfile
     - Deploy the container
     - Provide you with a URL (e.g., `https://edufun.onrender.com`)

## Configuration Files

The following files have been configured for Render deployment:

- **Dockerfile**: Multi-stage build for optimized production image
- **next.config.mjs**: Configured with `output: 'standalone'` for Docker
- **.dockerignore**: Excludes unnecessary files from Docker build
- **render.yaml**: Blueprint for automatic service configuration

## Important Notes

1. **Build Time**: First deployment may take 5-10 minutes
2. **Free Tier**: Apps spin down after 15 minutes of inactivity
3. **Port**: Render automatically sets the PORT environment variable
4. **Health Checks**: Configured to check `/` endpoint

## Updating Your App

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push origin master
```

Render will automatically rebuild and redeploy your app.

## Troubleshooting

### Build fails?
- Check the build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Dockerfile syntax

### App doesn't start?
- Check the deployment logs
- Verify environment variables
- Ensure PORT is not hardcoded (let Render set it)

### Need help?
- [Render Documentation](https://render.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## Custom Domain (Optional)

1. Go to your service settings in Render
2. Click "Custom Domains"
3. Add your domain and follow DNS configuration steps

---

Happy deploying! Your kids' digital safety education app will be live soon! 🎉

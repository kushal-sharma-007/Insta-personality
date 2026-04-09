# GitHub Pages Deployment Guide

## Quick Start (3 Steps)

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a repository named **`Insta-Personality`** (exact name is important for GitHub Pages URL)
3. Keep it public
4. Do NOT initialize with README (add existing code)

### Step 2: Initialize Git & Push Code
```bash
# Navigate to your project
cd "c:/Users/Kushal/Documents/Coding/Insta-Personality"

# Initialize git repository
git init
git add .
git commit -m "Initial commit: Insta-Personality dashboard"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Insta-Personality.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Install Dependencies & Deploy
```bash
# Install gh-pages package (already added to package.json)
npm install

# Build and deploy to GitHub Pages
npm run deploy
```

**That's it!** Your site will be live at: `https://YOUR_USERNAME.github.io/Insta-Personality/`

---

## What Changed in Your Project

### vite.config.js
- Added `base: '/Insta-Personality/'` to handle the repository subfolder path

### package.json
- Added `gh-pages` as dev dependency
- Added `deploy` script: `npm run build && gh-pages -d dist`

---

## Automatic GitHub Pages Configuration

After you push, GitHub will automatically:
1. Build your site from the `gh-pages` branch (created by `npm run deploy`)
2. Deploy to `username.github.io/Insta-Personality`

**Enable GitHub Pages (Manual Check):**
1. Go to your repo → Settings → Pages
2. Source should be: **Deploy from a branch**
3. Branch should be: **gh-pages** and **/(root)**
4. Wait 1-2 minutes for deployment

---

## Updating Your Site

After making changes:
```bash
git add .
git commit -m "Update: description of changes"
git push
npm run deploy
```

---

## Troubleshooting

**Issue: 404 error when visiting site**
- Verify repo name is exactly `Insta-Personality`
- Check settings → Pages → ensure `gh-pages` branch is selected
- Wait 2-3 minutes for GitHub to rebuild and deploy

**Issue: Videos/images not loading**
- The `base` path in vite.config.js handles this automatically
- Ensure story files are in `/public/stories/` directory

**Issue: Want custom domain?**
- Go to repo → Settings → Pages → Custom domain
- Point your domain's DNS to GitHub Pages
- [Full instructions here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Future Deployments (After Initial Setup)

Just push your code and run deploy:
```bash
git push
npm run deploy
```

GitHub will automatically detect changes and rebuild.

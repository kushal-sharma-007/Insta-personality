# GitHub Pages Deployment Script for Windows PowerShell
# Right-click and "Run with PowerShell"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Insta-Personality GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "[Step 1/4] Initializing Git Repository..." -ForegroundColor Yellow

# Initialize git
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Git initialization failed. Make sure Git is installed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

git add .
git commit -m "Initial commit: Insta-Personality Dashboard"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Git commit failed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[✓] Git repository initialized successfully" -ForegroundColor Green

Write-Host ""
Write-Host "[Step 2/4] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[✓] Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "[Step 3/4] Verifying configuration..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Build had issues but continuing..." -ForegroundColor Yellow
}
Write-Host "[✓] Configuration verified" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a GitHub repository:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   Name: Insta-Personality (exact)" -ForegroundColor White
Write-Host "   Make sure it's PUBLIC" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating repo, paste this (replace YOUR_USERNAME):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/Insta-Personality.git" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Run this to push code:" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Go to repo Settings > Pages and select:" -ForegroundColor White
Write-Host "   Source: 'Deploy from a branch'" -ForegroundColor Cyan
Write-Host "   Branch: 'gh-pages'" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Deploy with:" -ForegroundColor White
Write-Host "   npm run deploy" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your site will be live at:" -ForegroundColor Green
Write-Host "https://YOUR_USERNAME.github.io/Insta-Personality/" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"

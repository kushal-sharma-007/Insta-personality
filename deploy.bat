@echo off
REM GitHub Pages Deployment Script for Windows
REM Run this as Administrator in Command Prompt (cmd.exe)

cd /d "%~dp0"

echo.
echo ========================================
echo Insta-Personality GitHub Pages Deployment
echo ========================================
echo.

REM Step 1: Initialize Git
echo [Step 1/4] Initializing Git Repository...
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed. Make sure Git is installed.
    pause
    exit /b 1
)
git add .
git commit -m "Initial commit: Insta-Personality Dashboard"
if errorlevel 1 (
    echo ERROR: Git commit failed.
    pause
    exit /b 1
)
echo [✓] Git repository initialized successfully

echo.
echo [Step 2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
)
echo [✓] Dependencies installed

echo.
echo [Step 3/4] Next steps:
echo.
echo 1. Create a GitHub repository at: https://github.com/new
echo    - Name: Insta-Personality
echo    - Make it PUBLIC
echo.
echo 2. Add GitHub remote (copy-paste this with YOUR USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/Insta-Personality.git
echo.
echo 3. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. Configure GitHub Pages:
echo    - Go to repo Settings ^> Pages
echo    - Source: Deploy from a branch
echo    - Branch: gh-pages
echo.
echo 5. Deploy to GitHub Pages:
echo    npm run deploy
echo.
echo [Step 4/4] Verifying configuration...
call npm run build --if-present
echo [✓] All setup complete!

echo.
echo Your site will be live at:
echo https://YOUR_USERNAME.github.io/Insta-Personality/
echo.
pause

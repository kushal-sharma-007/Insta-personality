@echo off
REM Fix for "src refspec main does not match any" error
REM Run this in Command Prompt as Administrator

cd /d "c:\Users\Kushal\Documents\Coding\Insta-Personality"

echo Checking git status...
git status

echo.
echo Checking for commits...
git log --oneline -1

echo.
echo Current branches:
git branch -a

echo.
echo Fixing: Creating initial commit if needed...

REM Stage all files
git add .

REM Commit if there are changes
git commit -m "Initial commit: Insta-Personality Dashboard" --allow-empty

REM Ensure we're on main branch
git branch -M main

REM Show status
echo.
echo Status after fix:
git branch -a

echo.
echo Now try pushing:
echo git push -u origin main

pause

@echo off
REM Setup script for Android platform (Windows)
REM This script automates the setup of www folder and Android platform for Capacitor

echo Setting up Android platform for Capacitor...

REM Check if we're in the right directory
if not exist "capacitor.config.json" (
    echo Error: capacitor.config.json not found. Please run this script from the audiobook-app directory.
    exit /b 1
)

REM Step 1: Create www folder
echo Creating www folder...
if not exist "www" mkdir www

REM Step 2: Copy web assets
echo Copying web assets to www folder...
copy /Y index.html www\
copy /Y style.css www\
copy /Y app.js www\
copy /Y manifest.json www\
copy /Y sw.js www\
copy /Y mudrosti-db.js www\
copy /Y desktop-features.js www\

REM Step 3: Copy assets folder
echo Copying assets folder (this may take a moment due to audio files size)...
xcopy /E /I /Y assets www\assets

echo Web assets copied successfully!

REM Step 4: Install npm dependencies if needed
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
) else (
    echo npm dependencies already installed
)

REM Step 5: Add Android platform if not already added
if not exist "android" (
    echo Adding Android platform...
    call npx cap add android
) else (
    echo Android platform already exists
)

REM Step 6: Sync the project
echo Syncing Capacitor project...
call npx cap sync

echo.
echo Setup complete! Your Android platform is ready.
echo.
echo Next steps:
echo   1. Open Android Studio: npx cap open android
echo   2. Build APK: Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
echo   3. Find APK at: android\app\build\outputs\apk\debug\app-debug.apk
echo.

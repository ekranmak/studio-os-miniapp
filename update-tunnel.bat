@echo off
chcp 65001 > nul
title Update Telegram Mini App URL

echo Getting current tunnel URL...
set TUNNEL_URL=
for /f "tokens=*" %%a in ('type "%TEMP%\studio-os-tunnel.log" 2^>nul ^| findstr "loca.lt"') do (
    for /f "tokens=4" %%b in ("%%a") do set TUNNEL_URL=%%b
)

if not defined TUNNEL_URL (
    echo ERROR: Tunnel not running! Start studio OS first with start.bat
    pause
    exit /b 1
)

echo Tunnel URL: %TUNNEL_URL%
echo.
echo Updating Telegram bot menu button...

:: Update menu button
powershell -Command "Invoke-RestMethod -Uri 'https://api.telegram.org/bot8285193170:AAHnWnxKgbPHOPiMlHK16Sv10haFtirERAA/setChatMenuButton' -Method POST -ContentType 'application/json' -Body '{\"menu_button\":{\"type\":\"web_app\",\"text\":\"Studio OS CRM\",\"web_app\":{\"url\":\"%TUNNEL_URL%\"}}}'"

:: Update .env
powershell -Command "(Get-Content '%~dp0apps\api\.env') -replace 'TELEGRAM_WEBAPP_URL=.*', 'TELEGRAM_WEBAPP_URL=%TUNNEL_URL%' | Set-Content '%~dp0apps\api\.env'"

echo.
echo Done! Bot menu button updated to: %TUNNEL_URL%
echo.
echo Now send /start to your bot in Telegram!
pause

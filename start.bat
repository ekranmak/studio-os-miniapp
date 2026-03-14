@echo off
chcp 65001 > nul
title Studio OS CRM - Launcher

echo ========================================
echo    Studio OS CRM - Starting...
echo ========================================
echo.

:: Kill old processes on ports
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":4000 "') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":3000 "') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak > nul

:: Start API + Telegram Bot (port 4000)
echo [1/3] Starting API + Telegram Bot on port 4000...
start "Studio OS API" /MIN cmd /c "cd /d %~dp0apps\api && set DATABASE_URL=file:./dev.db && node dist\main.js"
timeout /t 3 /nobreak > nul

:: Start Mini App UI (port 3000)
echo [2/3] Starting Mini App UI on port 3000...
start "Studio OS Web" /MIN cmd /c "cd /d %~dp0 && node serve.js"
timeout /t 2 /nobreak > nul

:: Start localtunnel
echo [3/3] Starting HTTPS tunnel...
start "Studio OS Tunnel" /MIN cmd /c "lt --port 3000 > %TEMP%\studio-os-tunnel.log 2>&1"
timeout /t 5 /nobreak > nul

:: Get tunnel URL
set TUNNEL_URL=
for /f "tokens=*" %%a in ('type "%TEMP%\studio-os-tunnel.log" 2^>nul ^| findstr "loca.lt"') do (
    for /f "tokens=4" %%b in ("%%a") do set TUNNEL_URL=%%b
)

echo.
echo ========================================
echo  Studio OS CRM is RUNNING!
echo ========================================
echo.
echo  Local API:     http://localhost:4000
echo  Local Web:     http://localhost:3000
if defined TUNNEL_URL (
    echo  Telegram URL:  %TUNNEL_URL%
    echo.
    echo  Open @your_bot in Telegram and press START
) else (
    echo  Tunnel URL:    Check %TEMP%\studio-os-tunnel.log
)
echo.
echo  Press any key to stop all services...
pause > nul

:: Cleanup
taskkill /F /FI "WINDOWTITLE eq Studio OS API" 2>nul
taskkill /F /FI "WINDOWTITLE eq Studio OS Web" 2>nul
taskkill /F /FI "WINDOWTITLE eq Studio OS Tunnel" 2>nul

@echo off
cd /d "%~dp0"
start /min powershell -ExecutionPolicy Bypass -File .\server.ps1
ping 127.0.0.1 -n 2 >nul
start "" "%~dp0index.html"
start "" "http://localhost:3000/"
exit

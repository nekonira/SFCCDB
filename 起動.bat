@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo サカつく2026 データベース サーバーを起動しています...
start /min powershell -ExecutionPolicy Bypass -File .\server.ps1
timeout /t 1 /nobreak >nul
start http://localhost:3000/
exit

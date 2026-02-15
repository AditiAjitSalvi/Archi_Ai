# Start Archi Advisor System
Write-Host "Starting Archi Advisor System..." -ForegroundColor Cyan

# 1. Start Backend in a new window using the robust run_server.ps1 script
Write-Host "Launching Backend (Port 9900)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy Bypass", "-File", ".\Server\run_server.ps1"

# 2. Start Frontend in a new window
Write-Host "Launching Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai-tech-advisor-frontend; npm run dev"

Write-Host "System commands initiated." -ForegroundColor Green
Write-Host "Backend will be available at http://127.0.0.1:9900"
Write-Host "Frontend will be available at http://localhost:5173"

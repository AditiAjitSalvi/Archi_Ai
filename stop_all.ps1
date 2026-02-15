# Stop Archi Advisor System
Write-Host "Stopping Archi Advisor System..." -ForegroundColor Cyan

function Stop-PortProcess($port, $name) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Write-Host "Stopping $name (Port $port, PID $process)..." -ForegroundColor Yellow
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Write-Host "$name stopped." -ForegroundColor Green
    }
    else {
        Write-Host "$name is not running (Port $port is free)." -ForegroundColor DarkGray
    }
}

# 1. Stop Backend
Stop-PortProcess 9900 "Backend Server"

# 2. Stop Frontend
Stop-PortProcess 5173 "Frontend Application"

Write-Host "All services stopped." -ForegroundColor Cyan

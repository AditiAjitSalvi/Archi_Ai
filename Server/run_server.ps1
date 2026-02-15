# Archi Advisor - Robust Server Startup Script

Write-Host "Starting Archi Advisor Server..." -ForegroundColor Cyan

# Ensure we are in the script's directory (Server folder)
Set-Location $PSScriptRoot

# 1. Kill any process occupying port 9900
$port = 9900
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process $process using port $port. Terminating..." -ForegroundColor Yellow
    Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
    Write-Host "Process terminated." -ForegroundColor Green
}
else {
    Write-Host "Port $port is free." -ForegroundColor Green
}

# 2. Activate Virtual Environment and Start Uvicorn
Write-Host "Activating venv and starting Uvicorn..." -ForegroundColor Cyan

# Check if venv exists
if (Test-Path ".\venv\Scripts\Activate.ps1") {
    # Run uvicorn directly from the venv python
    & ".\venv\Scripts\python.exe" -m uvicorn back:app --host 127.0.0.1 --port $port --reload
}
else {
    Write-Error "Virtual environment not found! Please run 'python -m venv venv' first."
}

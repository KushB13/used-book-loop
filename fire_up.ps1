# Book-Loop: Platform Ignition Script
# This script starts the combined Frontend and Firebase logic dev environment.

Clear-Host
Write-Host "==========================================" -ForegroundColor Blue
Write-Host "       BOOK-LOOP: IGNITION SEQUENCE       " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Blue

# 1. Check for Node Modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[!] node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "[OK] Dependencies verified." -ForegroundColor Green
}

# 2. Fire up the Platform
Write-Host "[*] Launching Frontend & Backend Services..." -ForegroundColor Magenta
Write-Host "    -> Local: http://localhost:5173" -ForegroundColor White
Write-Host "------------------------------------------"

npm run fire

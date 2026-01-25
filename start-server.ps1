# VIP Advanced AI Assistant - Start Server
# This script starts a local web server to avoid CORS errors

Write-Host "🚀 Starting VIP AI Assistant Local Server..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonInstalled = $false
try {
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -match "Python") {
        $pythonInstalled = $true
        Write-Host "✅ Python detected: $pythonVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Python not found" -ForegroundColor Yellow
}

# Check if Node.js is installed
$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>&1
    if ($nodeVersion -match "v") {
        $nodeInstalled = $true
        Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

if ($pythonInstalled) {
    Write-Host "🐍 Starting Python HTTP Server on port 8000..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📱 Open your browser and go to:" -ForegroundColor Green
    Write-Host "   http://localhost:8000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    
    # Start Python server
    python -m http.server 8000
    
} elseif ($nodeInstalled) {
    Write-Host "📦 Checking for http-server..." -ForegroundColor Cyan
    
    # Check if http-server is installed
    $httpServerInstalled = $false
    try {
        $httpServerVersion = http-server --version 2>&1
        if ($httpServerVersion -match "\d") {
            $httpServerInstalled = $true
        }
    } catch {
        Write-Host "Installing http-server globally..." -ForegroundColor Yellow
        npm install -g http-server
        $httpServerInstalled = $true
    }
    
    if ($httpServerInstalled) {
        Write-Host "🌐 Starting Node.js HTTP Server on port 8000..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📱 Open your browser and go to:" -ForegroundColor Green
        Write-Host "   http://localhost:8000" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
        Write-Host ""
        
        # Start http-server
        http-server -p 8000
    }
    
} else {
    Write-Host "❌ Neither Python nor Node.js is installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install one of the following:" -ForegroundColor Yellow
    Write-Host "  • Python: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "  • Node.js: https://nodejs.org/" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use VS Code with Live Server extension" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
}

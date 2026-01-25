# TestSprite Test Runner
# Runs tests using the existing test files

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TestSprite Test Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$testDir = Join-Path $PSScriptRoot "testsprite_tests"
$serverRunning = $false

# Check if server is running
Write-Host "Checking if server is running on port 8000..." -ForegroundColor Yellow
$serverCheck = netstat -ano | Select-String ":8000"
if ($serverCheck) {
    Write-Host "✅ Server is running" -ForegroundColor Green
    $serverRunning = $true
} else {
    Write-Host "⚠️  Server not running. Starting server..." -ForegroundColor Yellow
    Start-Process python -ArgumentList "-m","http.server","8000" -WindowStyle Hidden
    Start-Sleep -Seconds 3
    $serverCheck = netstat -ano | Select-String ":8000"
    if ($serverCheck) {
        Write-Host "✅ Server started" -ForegroundColor Green
        $serverRunning = $true
    } else {
        Write-Host "❌ Failed to start server" -ForegroundColor Red
        exit 1
    }
}

if (-not $serverRunning) {
    Write-Host "❌ Cannot proceed without server" -ForegroundColor Red
    exit 1
}

# Check for Playwright
Write-Host ""
Write-Host "Checking Playwright installation..." -ForegroundColor Yellow
try {
    python -c "import playwright; print('OK')" 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Not installed"
    }
    Write-Host "✅ Playwright is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Playwright not installed" -ForegroundColor Red
    Write-Host "Installing Playwright..." -ForegroundColor Yellow
    pip install playwright
    playwright install chromium
    Write-Host "✅ Playwright installed" -ForegroundColor Green
}

# Run tests
Write-Host ""
Write-Host "Running TestSprite tests..." -ForegroundColor Cyan
Write-Host ""

Push-Location $testDir

# Try to run the test runner
if (Test-Path "run_all_tests.py") {
    Write-Host "Running all tests using test runner..." -ForegroundColor Yellow
    python run_all_tests.py
} else {
    Write-Host "Running individual test: TC003 (Keyboard shortcuts)..." -ForegroundColor Yellow
    python TC003_Keyboard_shortcut_default_behaviors.py
}

Pop-Location

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test execution complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

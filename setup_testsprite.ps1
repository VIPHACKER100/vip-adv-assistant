# TestSprite MCP Setup Script for Windows
# Run this script to configure TestSprite API key

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TestSprite MCP Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if API key is already set
$existingKey = [System.Environment]::GetEnvironmentVariable('TESTSPRITE_API_KEY', 'User')
if ($existingKey) {
    Write-Host "⚠️  API Key already set: $($existingKey.Substring(0, [Math]::Min(10, $existingKey.Length)))..." -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne 'y') {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit
    }
}

# Prompt for API key
Write-Host ""
Write-Host "Enter your TestSprite API Key:" -ForegroundColor Green
Write-Host "(Get it from: https://testsprite.com)" -ForegroundColor Gray
Write-Host ""
$apiKey = Read-Host "API Key" -AsSecureString
$apiKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiKey)
)

if ([string]::IsNullOrWhiteSpace($apiKeyPlain)) {
    Write-Host "❌ API Key cannot be empty!" -ForegroundColor Red
    exit 1
}

# Set environment variable
try {
    [System.Environment]::SetEnvironmentVariable('TESTSPRITE_API_KEY', $apiKeyPlain, 'User')
    Write-Host ""
    Write-Host "✅ API Key set successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Restart Cursor IDE" -ForegroundColor White
    Write-Host "2. Start your app: python -m http.server 8000" -ForegroundColor White
    Write-Host "3. In Cursor, ask: 'Run tests using TestSprite'" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "❌ Error setting API key: $_" -ForegroundColor Red
    exit 1
}

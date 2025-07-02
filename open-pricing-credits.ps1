# PowerShell script to open VidGenAI Admin Pricing with Credits System
# Opens the pricing tab with the new credits pricing management

Write-Host "💳 Opening VidGenAI Admin Pricing Dashboard..." -ForegroundColor Green
Write-Host "🎯 New Features:" -ForegroundColor Yellow
Write-Host "   • Monthly subscription plans management" -ForegroundColor Cyan
Write-Host "   • Complete credits pricing system" -ForegroundColor Cyan
Write-Host "   • Credits packages (100, 500, 1000, 5000)" -ForegroundColor Cyan
Write-Host "   • Usage rates for different video types" -ForegroundColor Cyan
Write-Host "   • Credits sales statistics" -ForegroundColor Cyan

# Wait a moment for the server to be ready if it's starting
Start-Sleep -Seconds 2

# Open the admin pricing tab
Start-Process "http://localhost:3001/admin?tab=pricing"

Write-Host "✅ Pricing Dashboard opened!" -ForegroundColor Green
Write-Host "💰 Credits System Features:" -ForegroundColor Magenta
Write-Host "   - 4 different credit packages with volume discounts" -ForegroundColor White
Write-Host "   - Individual pricing controls for each package" -ForegroundColor White
Write-Host "   - Usage rates for different video qualities and features" -ForegroundColor White
Write-Host "   - Real-time statistics on credits sales and usage" -ForegroundColor White
Write-Host "   - Combined with existing monthly subscription plans" -ForegroundColor White

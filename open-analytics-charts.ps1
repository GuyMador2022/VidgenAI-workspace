# PowerShell script to open VidGenAI Admin Analytics with Charts
# Opens the analytics tab with the new user growth charts

Write-Host "📊 Opening VidGenAI Admin Analytics Dashboard..." -ForegroundColor Green
Write-Host "🎯 Features:" -ForegroundColor Yellow
Write-Host "   • User growth comparison charts" -ForegroundColor Cyan
Write-Host "   • Monthly vs previous month analytics" -ForegroundColor Cyan
Write-Host "   • Daily new users tracking" -ForegroundColor Cyan
Write-Host "   • Interactive time range selectors" -ForegroundColor Cyan

# Wait a moment for the server to be ready if it's starting
Start-Sleep -Seconds 2

# Open the admin analytics dashboard
Start-Process "http://localhost:3001/admin?tab=analytics"

Write-Host "✅ Analytics Dashboard opened!" -ForegroundColor Green
Write-Host "📈 New features:" -ForegroundColor Magenta
Write-Host "   - User growth charts showing current vs previous period" -ForegroundColor White
Write-Host "   - Daily new users bar chart for last 7 days" -ForegroundColor White
Write-Host "   - Time range selector (7 days, 30 days, 90 days, 1 year)" -ForegroundColor White
Write-Host "   - Interactive tooltips on hover" -ForegroundColor White

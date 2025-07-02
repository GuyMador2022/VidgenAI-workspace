# PowerShell script to open VidGenAI Admin
# Opens the admin interface with Analytics as the default first tab

Write-Host "🚀 Opening VidGenAI Admin..." -ForegroundColor Green
Write-Host "📊 Analytics tab opens by default!" -ForegroundColor Yellow

# Wait a moment for the server to be ready if it's starting
Start-Sleep -Seconds 2

# Open the admin page - analytics is now the default first tab
Start-Process "http://localhost:3001/admin"

Write-Host "✅ Admin opened! Analytics tab is the default." -ForegroundColor Green
Write-Host "💡 Analytics is now the first tab that opens when accessing /admin" -ForegroundColor Cyancript to open VidGenAI Admin Analytics
# Opens the analytics tab directly within the admin interface

Write-Host "🚀 Opening VidGenAI Admin..." -ForegroundColor Green
Write-Host "📊 Analytics tab is now the first tab on the right!" -ForegroundColor Yellow

# Wait a moment for the server to be ready if it's starting
Start-Sleep -Seconds 2

# Open the admin page - analytics is now the first tab
Start-Process "http://localhost:3001/admin"

Write-Host "✅ Admin opened! Analytics tab is on the right side." -ForegroundColor Green
Write-Host "💡 You can also access analytics directly with: http://localhost:3001/admin?tab=analytics" -ForegroundColor Cyan

# פתיחה מהירה של כל הדפים הראשיים
Write-Host "🚀 פותח את כל הדפים הראשיים..." -ForegroundColor Green

$pages = @(
    "http://localhost:3000/",
    "http://localhost:3000/signup",
    "http://localhost:3000/userdashboard", 
    "http://localhost:3000/user_products",
    "http://localhost:3000/plans",
    "http://localhost:3000/VidGenAI-homepage"
)

foreach ($page in $pages) {
    Write-Host "📖 פותח: $page" -ForegroundColor Yellow
    Start-Process $page
    Start-Sleep -Seconds 1
}

Write-Host "✅ כל הדפים נפתחו!" -ForegroundColor Green

# PowerShell Script to Open All VidGenAI Pages
# Make sure the dev server is running first (npm run dev)

Write-Host "Opening all VidGenAI pages in your default browser..." -ForegroundColor Green

# Main pages
$pages = @(
    "http://localhost:3001/",                    # Homepage
    "http://localhost:3001/landing",             # Landing page
    "http://localhost:3001/signup",              # Signup page
    "http://localhost:3001/userdashboard",       # User dashboard
    "http://localhost:3001/products",            # Admin products page
    "http://localhost:3001/user_products"       # User products page
)

# Open each page with a small delay
foreach ($page in $pages) {
    Write-Host "Opening: $page" -ForegroundColor Yellow
    Start-Process $page
    Start-Sleep -Seconds 2  # Wait 2 seconds between opening pages
}

Write-Host "All pages opened successfully!" -ForegroundColor Green
Write-Host "Note: Make sure your dev server is running with 'npm run dev'" -ForegroundColor Cyan

# Quick launch script for VidGenAI
# This script will run the dev server and open the main page

Write-Host "Starting VidGenAI development environment..." -ForegroundColor Green

# Navigate to the project directory
Set-Location "c:\Users\PC\Desktop\working\VidgenAI-workspace"

# Start the dev server in the background
Write-Host "Starting Next.js development server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd 'c:\Users\PC\Desktop\working\VidgenAI-workspace'; npm run dev" -WindowStyle Minimized

# Wait a bit for the server to start
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Open the main page
Write-Host "Opening VidGenAI homepage..." -ForegroundColor Green
Start-Process "http://localhost:3001/"

Write-Host "VidGenAI is now running!" -ForegroundColor Green
Write-Host "Homepage: http://localhost:3001/" -ForegroundColor Cyan
Write-Host "To open all pages, run: .\open-all-pages.ps1" -ForegroundColor Cyan

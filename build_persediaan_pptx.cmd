@echo off
setlocal EnableExtensions
TITLE Build PPTX - Persediaan

echo This will build Manajemen_Persediaan.pptx from persediaan_deck.md

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Opening download page...
  start "" "https://nodejs.org/en/download"
  pause
  exit /b 1
)

where npx >nul 2>nul
if errorlevel 1 (
  echo "npx" was not found. After installing Node.js, double-click this file again.
  pause
  exit /b 1
)

npx -y @marp-team/marp-cli@latest "persediaan_deck.md" --pptx -o "Manajemen_Persediaan.pptx"
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

echo Done. Opening PPTX...
start "" "Manajemen_Persediaan.pptx"
pause
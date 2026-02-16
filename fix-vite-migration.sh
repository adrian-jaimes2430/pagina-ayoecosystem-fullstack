# Script PowerShell para migrar de Create React App a Vite
# Ejecutar desde la carpeta RAÍZ del repositorio (donde está el README.md)

Write-Host "🚀 Migrando de Create React App a Vite..." -ForegroundColor Green
Write-Host ""

# Verificar que estamos en la carpeta correcta
if (-Not (Test-Path "frontend")) {
    Write-Host "❌ Error: No se encuentra la carpeta 'frontend'" -ForegroundColor Red
    Write-Host "Por favor ejecuta este script desde la raíz del repositorio"
    exit 1
}

# Crear backup
Write-Host "📦 Creando backup de package.json..." -ForegroundColor Yellow
Copy-Item "frontend\package.json" "frontend\package.json.backup"

# Corregir package.json (remover coma extra en línea 48)
Write-Host "🔧 Corrigiendo package.json (removiendo coma extra)..." -ForegroundColor Yellow
$packageJson = Get-Content "frontend\package.json" -Raw
$packageJson = $packageJson -replace '"tailwindcss-animate": "\^1\.0\.7",', '"tailwindcss-animate": "^1.0.7"'
Set-Content "frontend\package.json" $packageJson

# Actualizar variables de entorno
Write-Host "🔄 Actualizando variables de entorno en archivos JS..." -ForegroundColor Yellow

Get-ChildItem -Path "frontend\src\" -Recurse -Include *.js,*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace 'process\.env\.REACT_APP_BACKEND_URL', 'import.meta.env.VITE_API_URL'
    if ($content -ne $newContent) {
        Set-Content $_.FullName $newContent -NoNewline
        Write-Host "  ✓ Actualizado: $($_.Name)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✅ Cambios completados!" -ForegroundColor Green
Write-Host ""

# Verificar cambios
Write-Host "📊 Verificando cambios..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Archivos modificados con VITE_API_URL:"
$matches = Select-String -Path "frontend\src\*" -Pattern "import.meta.env.VITE_API_URL" -Recurse
$uniqueFiles = $matches | Select-Object -ExpandProperty Path -Unique
$uniqueFiles | ForEach-Object { Write-Host "  ✓ $_" -ForegroundColor Gray }

Write-Host ""
Write-Host "Verificando que NO queden referencias a REACT_APP_BACKEND_URL..."
$remaining = Select-String -Path "frontend\src\*" -Pattern "process.env.REACT_APP_BACKEND_URL" -Recurse
if ($null -eq $remaining) {
    Write-Host "✅ No quedan referencias a REACT_APP_BACKEND_URL" -ForegroundColor Green
} else {
    Write-Host "⚠️  Aún quedan referencias a REACT_APP_BACKEND_URL:" -ForegroundColor Yellow
    $remaining | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}

Write-Host ""
Write-Host "📝 Verificando sintaxis de package.json..." -ForegroundColor Cyan
Push-Location "frontend"
$npmCheck = npm install --dry-run 2>&1
Pop-Location

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ package.json tiene sintaxis válida" -ForegroundColor Green
} else {
    Write-Host "❌ Error en package.json - restaurando backup..." -ForegroundColor Red
    Copy-Item "frontend\package.json.backup" "frontend\package.json"
    exit 1
}

Write-Host ""
Write-Host "🎉 ¡Migración completada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. git add ."
Write-Host "2. git commit -m 'fix: migrate to Vite environment variables'"
Write-Host "3. git push origin main"
Write-Host ""
Write-Host "4. Verifica en Vercel:"
Write-Host "   - Framework Preset: Vite"
Write-Host "   - Output Directory: dist"
Write-Host "   - Variable de entorno: VITE_API_URL configurada"
Write-Host ""
Write-Host "Backup guardado en: frontend\package.json.backup" -ForegroundColor Gray

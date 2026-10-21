param(
  [string]$SiteUrl = ""
)

$ErrorActionPreference = "Stop"
$pdfPath = Join-Path $PSScriptRoot "public\resume.pdf"
$distPath = Join-Path $PSScriptRoot "dist\resume.pdf"

if (-not (Test-Path -LiteralPath $pdfPath -PathType Leaf)) {
  Write-Error "Resume PDF is missing: $pdfPath. Put your current resume at public\resume.pdf."
  exit 1
}

$pdf = Get-Item -LiteralPath $pdfPath
if ($pdf.Length -lt 1000) {
  Write-Error "public\resume.pdf exists but is unusually small ($($pdf.Length) bytes). Verify that it is a real PDF."
  exit 1
}
Write-Host "PASS: public\resume.pdf exists ($($pdf.Length) bytes)."

if (Test-Path -LiteralPath $distPath -PathType Leaf) {
  $distPdf = Get-Item -LiteralPath $distPath
  if ($distPdf.Length -ne $pdf.Length) {
    Write-Warning "dist\resume.pdf exists, but its size differs from public\resume.pdf. Re-run npm run build."
  } else {
    Write-Host "PASS: dist\resume.pdf exists and matches the source file size."
  }
} else {
  Write-Host "INFO: dist\resume.pdf not found yet. Run npm run build, then re-run this check."
}


if ($SiteUrl) {
  try {
    $response = Invoke-WebRequest -Uri $SiteUrl -Method Head -MaximumRedirection 5 -TimeoutSec 20
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
      Write-Host "PASS: deployed resume URL returned HTTP $($response.StatusCode): $SiteUrl"
    } else {
      Write-Error "Deployed resume URL returned HTTP $($response.StatusCode): $SiteUrl"
      exit 1
    }
  } catch {
    Write-Error "Could not verify deployed resume URL '$SiteUrl': $($_.Exception.Message)"
    exit 1
  }
} else {
  Write-Host "INFO: To test the deployment, pass the exact resume URL, for example: .\check-resume.ps1 -SiteUrl 'https://YOUR-PAGES-URL/resume.pdf'"
}

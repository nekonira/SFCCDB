Add-Type -AssemblyName System.Drawing

function Generate-ShieldIcon {
    param(
        [int]$size = 512,
        [string]$outputPath = "apple-touch-icon.png"
    )

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # 1. Outer Dark Background #070a10
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#070a10"))
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # 2. Outer Glow / Gradient Frame
    $padding = [int]($size * 0.08)
    $frameSize = [int]($size - ($padding * 2))
    $rectX = [int]$padding
    $rectY = [int]$padding
    $cornerRadius = [int]($size * 0.20)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = [int]($cornerRadius * 2)
    $path.AddArc($rectX, $rectY, $diameter, $diameter, 180, 90)
    $path.AddArc(($rectX + $frameSize - $diameter), $rectY, $diameter, $diameter, 270, 90)
    $path.AddArc(($rectX + $frameSize - $diameter), ($rectY + $frameSize - $diameter), $diameter, $diameter, 0, 90)
    $path.AddArc($rectX, ($rectY + $frameSize - $diameter), $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $rectGrad = New-Object System.Drawing.Rectangle($rectX, $rectY, $frameSize, $frameSize)
    $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rectGrad,
        [System.Drawing.ColorTranslator]::FromHtml("#00FF66"),
        [System.Drawing.ColorTranslator]::FromHtml("#00E5FF"),
        45.0
    )
    $g.FillPath($gradBrush, $path)

    # 3. Inner Dark Card Body (#070a10)
    $innerBorderWidth = [int]($size * 0.02)
    $inX = [int]($rectX + $innerBorderWidth)
    $inY = [int]($rectY + $innerBorderWidth)
    $inSize = [int]($frameSize - ($innerBorderWidth * 2))
    $inRadius = [int]($cornerRadius * 0.85)
    $inDiameter = [int]($inRadius * 2)

    $innerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $innerPath.AddArc($inX, $inY, $inDiameter, $inDiameter, 180, 90)
    $innerPath.AddArc(($inX + $inSize - $inDiameter), $inY, $inDiameter, $inDiameter, 270, 90)
    $innerPath.AddArc(($inX + $inSize - $inDiameter), ($inY + $inSize - $inDiameter), $inDiameter, $inDiameter, 0, 90)
    $innerPath.AddArc($inX, ($inY + $inSize - $inDiameter), $inDiameter, $inDiameter, 90, 90)
    $innerPath.CloseFigure()

    $innerBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#070a10"))
    $g.FillPath($innerBgBrush, $innerPath)

    # 4. Draw Shield Vector Emblem (#00FF66)
    $cx = [float]($size / 2.0)
    $cy = [float]($size / 2.0)
    $s = [float]($size * 0.52 / 24.0)

    $shieldPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#00FF66"), [float]($size * 0.045))
    $shieldPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $shieldPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $shieldPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    function To-Pt([float]$x, [float]$y) {
        $px = [float]($cx + ($x - 12.0) * $s)
        $py = [float]($cy + ($y - 12.0) * $s)
        return New-Object System.Drawing.PointF($px, $py)
    }

    # Draw Outer Shield
    $sp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pts = [System.Drawing.PointF[]]@(
        (To-Pt 12.0 2.944),
        (To-Pt 16.3 3.100),
        (To-Pt 20.618 4.984),
        (To-Pt 21.0 9.000),
        (To-Pt 21.0 9.500),
        (To-Pt 20.5 13.000),
        (To-Pt 17.5 16.800),
        (To-Pt 12.0 20.622),
        (To-Pt 6.5 16.800),
        (To-Pt 3.5 13.000),
        (To-Pt 3.0 9.500),
        (To-Pt 3.0 9.000),
        (To-Pt 3.382 4.984),
        (To-Pt 7.7 3.100),
        (To-Pt 12.0 2.944)
    )

    $sp.AddLines($pts)
    $g.DrawPath($shieldPen, $sp)

    # Inner Checkmark M9 12l2 2 4-4
    $checkPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#00FF66"), [float]($size * 0.055))
    $checkPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $checkPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $checkPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $cp1 = To-Pt 8.8 12.0
    $cp2 = To-Pt 11.0 14.2
    $cp3 = To-Pt 15.2 10.0

    $g.DrawLine($checkPen, $cp1, $cp2)
    $g.DrawLine($checkPen, $cp2, $cp3)

    $dir = [System.IO.Path]::GetDirectoryName($outputPath)
    if ($dir -and !(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "SUCCESS: Generated shield icon at: $outputPath ($size x $size)"
}

Generate-ShieldIcon -size 512 -outputPath "c:\Users\nekon\SFCCdeta\apple-touch-icon.png"
Generate-ShieldIcon -size 192 -outputPath "c:\Users\nekon\SFCCdeta\public\icon-192.png"
Generate-ShieldIcon -size 512 -outputPath "c:\Users\nekon\SFCCdeta\public\icon-512.png"

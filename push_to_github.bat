@echo off
chcp 65001 >nul
title Push to GitHub - VAJIRA IRB
cd /d "%~dp0"
echo ========================================================
echo   VAJIRA IRB - กำลังนำข้อมูลขึ้น GitHub (Push to GitHub)
echo   Repository: https://github.com/hirobonby-arch/vajirairb.git
echo ========================================================
echo.
echo * หมายเหตุ: หากมีหน้าต่างเบราว์เซอร์เด้งขึ้นมา ให้กด "Sign in with your browser" เพื่อยืนยันตัวตน
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   [สำเร็จ] นำข้อมูลขึ้น GitHub เรียบร้อยแล้ว!
    echo   เข้าดูได้ที่: https://github.com/hirobonby-arch/vajirairb
    echo ========================================================
) else (
    echo ========================================================
    echo   [แจ้งเตือน] ยังไม่สามารถส่งขึ้น GitHub ได้
    echo   โปรดตรวจสอบการล็อกอินบัญชี GitHub hirobonby-arch
    echo ========================================================
)
echo.
pause

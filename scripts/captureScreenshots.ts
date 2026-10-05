import { chromium } from '@playwright/test'
import path from 'path'
import fs from 'fs'

async function capture() {
  const outDir = path.join(process.cwd(), 'docs', 'screenshots')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const browser = await chromium.launch()

  // 1. Desktop Screenshot
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto('http://localhost:3000')

  // Dismiss onboarding if present
  const getStarted = desktopPage.getByRole('button', { name: /Get Started/i })
  if (await getStarted.isVisible()) {
    await getStarted.click()
  }

  await desktopPage.waitForTimeout(2000)
  await desktopPage.screenshot({ path: path.join(outDir, 'desktop_home.png') })

  // 2. Radar Page
  await desktopPage.goto('http://localhost:3000/radar')
  await desktopPage.waitForTimeout(2000)
  await desktopPage.screenshot({ path: path.join(outDir, 'radar_map.png') })

  // 3. Compare Page
  await desktopPage.goto('http://localhost:3000/compare')
  await desktopPage.waitForTimeout(2000)
  await desktopPage.screenshot({ path: path.join(outDir, 'compare_cities.png') })

  // 4. Cities Page
  await desktopPage.goto('http://localhost:3000/cities')
  await desktopPage.waitForTimeout(2000)
  await desktopPage.screenshot({ path: path.join(outDir, 'pick_location.png') })

  // 5. Mobile Viewport Screenshot
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto('http://localhost:3000')
  const getStartedMobile = mobilePage.getByRole('button', { name: /Get Started/i })
  if (await getStartedMobile.isVisible()) {
    await getStartedMobile.click()
  }
  await mobilePage.waitForTimeout(2000)
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_home.png') })

  await browser.close()
  console.log('✅ Real screenshots saved to docs/screenshots/')
}

capture().catch(console.error)

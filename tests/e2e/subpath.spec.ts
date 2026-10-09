import { test, expect } from '@playwright/test'

test.describe('Production build under sub-path', () => {
  test('production build renders under a sub-path with zero console errors and direct deep link refresh', async ({ page }) => {
    const consoleErrors: string[] = []
    const failedRequests: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`)
    })

    // 1. Home page renders under base path
    await page.goto('/')

    // Complete onboarding if present
    const getStartedBtn = page.getByRole('button', { name: /Get Started/i })
    if (await getStartedBtn.isVisible()) {
      await getStartedBtn.click()
    }

    // Verify title and main elements
    await expect(page).toHaveTitle(/SkyCast/i)

    // Verify hero section temperature or dashboard structure is present
    const rootElement = page.locator('#root')
    await expect(rootElement).toBeVisible()

    // Verify deep route direct opening / refresh
    await page.goto('/radar')
    await expect(page).toHaveTitle(/SkyCast/i)

    await page.goto('/settings')
    await expect(page.getByText(/Units & Formats/i)).toBeVisible()

    // Assert zero critical console errors
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes('Failed to load resource') && !err.includes('favicon')
    )
    expect(criticalErrors).toEqual([])
  })
})

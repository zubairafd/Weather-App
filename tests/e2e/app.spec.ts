import { test, expect } from '@playwright/test'

test.describe('SkyCast Weather App E2E Flow', () => {
  test('should display onboarding on first visit and proceed to dashboard', async ({ page, isMobile }) => {
    await page.goto('/')

    // Check splash modal
    const getStartedBtn = page.getByRole('button', { name: /Get Started/i })
    if (await getStartedBtn.isVisible()) {
      await getStartedBtn.click()
    }

    // Verify header title / page loaded
    await expect(page).toHaveTitle(/SkyCast/i)

    if (isMobile) {
      // Mobile uses center + button
      const searchPlusBtn = page.getByRole('button', { name: /Add location or search/i })
      await expect(searchPlusBtn).toBeVisible()
    } else {
      // Desktop uses sidebar/header search bar
      const searchBtn = page.getByText(/Search city/i).first()
      await expect(searchBtn).toBeVisible()
    }
  })

  test('should open search modal when clicking search', async ({ page, isMobile }) => {
    await page.goto('/')

    // Complete onboarding if present
    const getStartedBtn = page.getByRole('button', { name: /Get Started/i })
    if (await getStartedBtn.isVisible()) {
      await getStartedBtn.click()
    }

    if (isMobile) {
      await page.getByRole('button', { name: /Add location or search/i }).click()
    } else {
      await page.getByText(/Search city/i).first().click()
    }

    // Verify search modal input
    const input = page.getByPlaceholder(/Type city name/i)
    await expect(input).toBeVisible()
  })

  test('should navigate to cities page', async ({ page }) => {
    await page.goto('/cities')
    await expect(page.getByText(/Pick Location/i)).toBeVisible()
  })

  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText(/Units & Formats/i)).toBeVisible()
  })
})

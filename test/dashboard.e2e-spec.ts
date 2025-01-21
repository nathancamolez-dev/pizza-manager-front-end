import { test, expect } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true })).toBeVisible()
  expect(page.getByText('+10% em relação a ontem')).toBeVisible()
})

test('display month orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('36', { exact: true })).toBeVisible()
  expect(page.getByText('+19% em relação a ontem')).toBeVisible()
})

test('display all cancel orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('222', { exact: true })).toBeVisible()
  expect(page.getByText('+10% em relação a ontem')).toBeVisible()
})

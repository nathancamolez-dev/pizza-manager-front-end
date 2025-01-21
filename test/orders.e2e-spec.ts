import { test, expect } from '@playwright/test'

test('see if orders its loaded', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'Customer + 1', exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Customer + 10', exact: true })
  ).toBeVisible()
})

test('test if has pagination', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer + 11', exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Customer + 19', exact: true })
  ).toBeVisible()

  await page.getByRole('button', { name: 'Ultima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer + 60', exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Customer + 69', exact: true })
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer + 1', exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Customer + 9', exact: true })
  ).toBeVisible()
})

test('filter by id ', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')

  await page
    .getByRole('button', { name: 'Filtrar resultados', exact: true })
    .click()

  await expect(
    page.getByRole('cell', { name: 'Customer + 11', exact: true })
  ).toBeVisible()
})
test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer + 11')

  await page
    .getByRole('button', { name: 'Filtrar resultados', exact: true })
    .click()

  await expect(
    page.getByRole('cell', { name: 'Customer + 11', exact: true })
  ).toBeVisible()
})

test('filter by status ', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page
    .getByRole('button', { name: 'Filtrar resultados', exact: true })
    .click()

  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()

  expect(tableRows).toHaveLength(10)
})

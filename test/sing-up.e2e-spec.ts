import { test, expect } from '@playwright/test'

test('if usar can a create new restaurant', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza shop')
  await page.getByLabel('Seu nome').fill('Nathan Alves')
  await page.getByLabel('Seu email').fill('johndoe@email.com')

  await page.getByRole('button', { name: 'Finalizar' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()
})

test('error on register new restaurant', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Erro')
  await page.getByLabel('Seu nome').fill('Nathan Alves')
  await page.getByLabel('Seu email').fill('nathan@email.com')

  await page.getByRole('button', { name: 'Finalizar' }).click()

  const toast = page.getByText('Erro ao cadastrar o restaurante!')

  expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'login' }).click()

  expect(page.url()).toContain('/sign-in')
})

import { test, expect } from '@playwright/test'

test('if user can make login', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu email').fill('johndoe@email.com')
  await page.getByRole('button', { name: 'Acessar' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para o seu email.'
  )

  expect(toast).toBeVisible()
})

test('login with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu email').fill('nathan@email.com')
  await page.getByRole('button', { name: 'Acessar' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})

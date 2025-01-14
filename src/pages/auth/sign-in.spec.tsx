import { render } from '@testing-library/react'
import { SignIn } from './sign-in'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { HelmetProvider } from 'react-helmet-async'

describe('SignIn', () => {
  it('shoould be able to make sign in', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter initialEntries={['/sign-in?email=johndoe@email.com']}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        )
      },
    })
    const emailInput = wrapper.getByLabelText('Seu email') as HTMLInputElement
    expect(emailInput.value).toBe('johndoe@email.com')
  })
})

import { http, HttpResponse } from 'msw'
import type { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      email: 'johndoe@email.com',
      name: 'John Doe',
      id: '1',
      password: null,
      role: 'manager',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
)

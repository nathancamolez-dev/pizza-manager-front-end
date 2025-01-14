import { http, HttpResponse } from 'msw'
import type { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    name: 'Pizza shop',
    id: '1',
    description: 'The best pizza shop in the world',
    managerId: '1',
    created_at: new Date(),
    updated_at: new Date(),
  })
})

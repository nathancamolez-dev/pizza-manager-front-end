import { api } from '@/lib/ axios'

interface GetManagedRestaurantResponse {
  name: string
  id: string
  created_at: Date
  updated_at: Date
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant'
  )

  return response.data
}

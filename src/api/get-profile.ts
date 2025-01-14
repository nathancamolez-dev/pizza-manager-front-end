import { api } from '@/lib/ axios'

export interface GetProfileResponse {
  email: string
  name: string
  id: string
  password: string | null
  role: 'manager' | 'customer'
  created_at: Date
  updated_at: Date
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}

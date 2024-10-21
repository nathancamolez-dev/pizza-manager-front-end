import { api } from '@/lib/ axios'

export interface getOrderDetailsParams {
  orderId: string
}

export interface getOrderDetailsResponse {
  id: string
  status: 'pending' | 'preparing' | 'delivered' | 'delivering' | 'cancelled'
  totalInCents: number
  created_at: string
  customer: {
    name: string
    email: string
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: getOrderDetailsParams) {
  const response = await api.get<getOrderDetailsResponse>(`/orders/${orderId}`)
  return response.data
}

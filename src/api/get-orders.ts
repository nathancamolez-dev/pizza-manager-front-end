import { api } from '@/lib/ axios'

export interface GetOrdersResponse {
  orders: {
    status: 'pending' | 'preparing' | 'delivered' | 'delivering' | 'cancelled'
    createdAt: string
    orderId: string
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}

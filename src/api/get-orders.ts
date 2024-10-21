import { api } from '@/lib/ axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}
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

export async function getOrders({
  pageIndex,
  customerName,
  status,
  orderId,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      status,
      orderId,
    },
  })

  return response.data
}

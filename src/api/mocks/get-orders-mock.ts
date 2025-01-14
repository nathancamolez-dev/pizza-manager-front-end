import { http, HttpResponse } from 'msw'
import type { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']
type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'preparing',
  'delivered',
  'delivering',
  'cancelled',
]

const order: Orders = Array.from({ length: 70 }).map((_, index) => {
  return {
    status: statuses[index % 5],
    createdAt: new Date().toISOString(),
    orderId: `order-${String(index)}`,
    customerName: `Customer + ${index}`,
    total: 24000,
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')
    const orderId = searchParams.get('orderId')

    let filteredOrders = order

    if (customerName) {
      filteredOrders = filteredOrders.filter(order =>
        order.customerName.includes(customerName)
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter(order => order.orderId === orderId)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    )
    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  }
)

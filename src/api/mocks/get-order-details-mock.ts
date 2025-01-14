import { http, HttpResponse } from 'msw'

import type { getOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http.get<
  never,
  never,
  getOrderDetailsResponse
>('/orders/:orderId', () => {
  return HttpResponse.json({
    id: '1',
    customer: {
      name: 'John Doe',
      email: 'johndoe@email.com',
    },
    status: 'pending',
    created_at: new Date().toISOString(),
    totalInCents: 1000,
    orderItems: [
      {
        id: '1',
        product: {
          name: 'Pizza de queijo',
        },
        quantity: 2,
        priceInCents: 500,
      },
      {
        id: '2',
        product: {
          name: 'Pizza de marguerita',
        },
        quantity: 1,
        priceInCents: 200,
      },
    ],
  })
})

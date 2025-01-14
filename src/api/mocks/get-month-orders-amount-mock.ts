import { http, HttpResponse } from 'msw'
import type { GetMonthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-order-amount', () => {
  return HttpResponse.json({
    orders: 20,
    diffFromYesterday: 10,
  })
})

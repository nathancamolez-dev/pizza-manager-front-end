import { http, HttpResponse } from 'msw'
import type { GetMonthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-order-amount', () => {
  return HttpResponse.json({
    orders: 36,
    diffFromYesterday: 19,
  })
})

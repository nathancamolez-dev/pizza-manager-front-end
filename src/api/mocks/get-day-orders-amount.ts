import { http, HttpResponse } from 'msw'
import type { GetDayOrdersAmountResponse } from '../get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>('/metrics/day-order-amount', () => {
  return HttpResponse.json({
    orders: 20,
    diffFromYesterday: 10,
  })
})

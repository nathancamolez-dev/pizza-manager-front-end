import { http, HttpResponse } from 'msw'
import type { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/day-order-amount', () => {
  return HttpResponse.json({
    receipt: 2000,
    diffFromLastMonth: 10,
  })
})

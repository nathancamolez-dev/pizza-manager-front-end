import { http, HttpResponse } from 'msw'
import type { GetMonthCanceledOrdersAmountResponse } from '../get-month-canceled-orders-amount'

export const getMonthOrdersCancelAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-cancelled-order-amount', () => {
  return HttpResponse.json({
    orders: 222,
    diffFromLastMonth: 10,
  })
})

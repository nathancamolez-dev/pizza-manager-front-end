import { api } from '@/lib/ axios'

export interface GetMonthCanceledOrdersAmountResponse {
  orders: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-cancelled-order-amount'
  )
  return response.data
}

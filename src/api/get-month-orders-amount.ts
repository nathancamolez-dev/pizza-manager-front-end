import { api } from '@/lib/ axios'

export interface GetMonthOrdersAmountResponse {
  orders: number
  diffFromYesterday: number
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    '/metrics/month-order-amount'
  )
  return response.data
}

import { api } from '@/lib/ axios'

export interface GetDayOrdersAmountResponse {
  orders: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>(
    '/metrics/day-order-amount'
  )
  return {
    orders: response.data.orders ?? 0,
    diffFromYesterday: response.data.diffFromYesterday,
  }
}

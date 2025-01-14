import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthOrdersCancelAmountMock } from './get-month-cancel-orders-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getDailyRevenueMock } from './get-daily-revenue-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { getRestaurantMock } from './get-restaurant-mock'
import { updateProfileMock } from './update-profile-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthOrdersCancelAmountMock,
  getMonthRevenueMock,
  getDailyRevenueMock,
  getPopularProductsMock,
  getProfileMock,
  getRestaurantMock,
  updateProfileMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  await worker.start()
}

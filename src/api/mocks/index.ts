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
import { getOrdersMock } from './get-orders-mock'
import { getOrderDetailsMock } from './get-order-details-mock'
import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { dispathOrderMock } from './dispatch-order-mock'
import { deliverOrderMock } from './deliver-order-mock'

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
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  dispathOrderMock,
  deliverOrderMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  await worker.start()
}

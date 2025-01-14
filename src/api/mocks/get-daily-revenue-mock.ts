import { http, HttpResponse } from 'msw'
import type { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '2022-01-01', receipt: 1000 },
    { date: '2022-01-02', receipt: 2000 },
    { date: '2022-01-03', receipt: 3000 },
    { date: '2022-01-04', receipt: 4000 },
    { date: '2022-01-05', receipt: 5000 },
    { date: '2022-01-06', receipt: 6000 },
    { date: '2022-01-07', receipt: 7000 },
    { date: '2022-01-08', receipt: 8000 },
    { date: '2022-01-09', receipt: 9000 },
    { date: '2022-01-10', receipt: 10000 },
    { date: '2022-01-11', receipt: 11000 },
    { date: '2022-01-12', receipt: 12000 },
  ])
})

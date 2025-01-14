import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-products'
export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza', amount: 20 },
    { product: 'Burger', amount: 10 },
    { product: 'Pasta', amount: 5 },
    { product: 'Sushi', amount: 3 },
    { product: 'Salad', amount: 2 },
    { product: 'Steak', amount: 1 },
    { product: 'Tacos', amount: 1 },
  ])
})

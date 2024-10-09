import { api } from '@/lib/ axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
  })
}

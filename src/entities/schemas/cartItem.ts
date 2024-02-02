import { z } from 'zod'
import { CartItem } from '../interfaces/cartItem'

const cartItemSchema = z.object({
  name: z.string({
    invalid_type_error: 'Item name must be a string',
    required_error: 'Item name is required.'
  }),
  price: z.number().min(0).max(10).default(5),
  quantity: z.number().min(0).max(10).default(5)
})

export function validateCartItem (input: unknown): CartItem {
  const result = cartItemSchema.safeParse(input)
  if (result.success) {
    return result.data as CartItem
  } else {
    throw new Error(result.error.message)
  }
}

export function validatePartialCartItem (input: unknown): Partial<CartItem> {
  const result = cartItemSchema.partial().safeParse(input)
  if (result.success) {
    return result.data as Partial<CartItem>
  } else {
    throw new Error(result.error.message)
  }
}

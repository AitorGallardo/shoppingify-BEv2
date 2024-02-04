/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { CartItemController } from '../controllers/cartItems'

export const createItemsRouter = ({ cartItemModel }: any): any => {
  const itemsRouter = Router()
  const cartItemController = new CartItemController({ cartItemModel })

  itemsRouter.get('/', cartItemController.getAll)
  itemsRouter.get('/:id', cartItemController.getById)
  itemsRouter.post('/', cartItemController.create)
  //   router.put('/:id', itemController.updateItem);
  //   router.delete('/:id', itemController.deleteItem);

  return itemsRouter
}

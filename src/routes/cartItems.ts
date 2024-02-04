
import { Router } from 'express'
import { CartItemController } from '../controllers/cartItems'

export const createItemsRouter = ({ cartItemModel }: any): any => {
  const itemsRouter = Router()
  const cartItemController = new CartItemController({ cartItemModel })

  itemsRouter.get('/', cartItemController.getAll)
  itemsRouter.get('/:id', cartItemController.getById)
  itemsRouter.post('/', cartItemController.create)
  itemsRouter.patch('/:id', cartItemController.update)
  itemsRouter.delete('/:id', cartItemController.delete)
  //   router.put('/:id', itemController.updateItem);

  return itemsRouter
}

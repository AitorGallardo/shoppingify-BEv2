/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import picocolors from 'picocolors'
// import { CartItemController } from '../controllers/cartItems'

export const createItemsRouter = ({ cartItemModel }: any): any => {
  const itemsRouter = Router()
  console.log(picocolors.blue('This is a blue message!'), cartItemModel)
  // const cartItemController = new CartItemController({ cartItemModel })
  // cartItemController.getAll
  itemsRouter.get('/', async (_, res) => { res.status(200).json('hola') })

  //   router.get('/', itemController.getAllItems);
  //   router.get('/:id', itemController.getItemById);
  //   router.post('/', itemController.createItem);
  //   router.put('/:id', itemController.updateItem);
  //   router.delete('/:id', itemController.deleteItem);

  return itemsRouter
}

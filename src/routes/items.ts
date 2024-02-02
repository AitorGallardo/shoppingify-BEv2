import { Router } from 'express'
import { MovieController } from '../controllers/items'

export const createItemsRouter = ({ itemModel }: any): any => {
  const itemsRouter = Router()

  const movieController = new MovieController({ itemModel })

  itemsRouter.get('/', movieController.getAll)
  itemsRouter.post('/', movieController.create)

  itemsRouter.get('/:id', movieController.getById)
  itemsRouter.delete('/:id', movieController.delete)
  itemsRouter.patch('/:id', movieController.update)

  //   router.get('/', itemController.getAllItems);
  //   router.get('/:id', itemController.getItemById);
  //   router.post('/', itemController.createItem);
  //   router.put('/:id', itemController.updateItem);
  //   router.delete('/:id', itemController.deleteItem);

  return itemsRouter
}

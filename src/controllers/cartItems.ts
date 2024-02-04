import { Request, Response } from 'express'
import { CartItemModel } from '../entities/models/cartItem'
import { validateCartItem } from '../entities/schemas/cartItem'
import picocolors from 'picocolors'

export class CartItemController {
  cartItemModel: CartItemModel
  constructor ({ cartItemModel }: { cartItemModel: CartItemModel }) {
    this.cartItemModel = cartItemModel
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query
    const cartItems = await this.cartItemModel.getAll({ category })
    res.status(200).json(cartItems)
  }

  getById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    const cartItem = await this.cartItemModel.getById(Number(id))
    if (cartItem) return res.status(200).json(cartItem)
    res.status(404).json({ message: 'Item not found' })
  }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const cartItem = validateCartItem(req.body)
      const newMovie = await this.cartItemModel.create(cartItem)
      res.status(201).json(newMovie)
    } catch (error: any) {
      console.error(picocolors.magenta(error))
      return res.status(400).json({ error: JSON.parse(error) })
    }
  }

  delete = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    const result = await this.cartItemModel.delete(+id)

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  // update = async (req: Request, res: Response): Promise<any> => {
  //   const result = validatePartialMovie(req.body)

  //   if (!result.success) {
  //     return res.status(400).json({ error: JSON.parse(result.error.message) })
  //   }

  //   const { id } = req.params

  //   const updatedMovie = await this.movieModel.update({ id, input: result.data })

  //   return res.json(updatedMovie)
  // }
}

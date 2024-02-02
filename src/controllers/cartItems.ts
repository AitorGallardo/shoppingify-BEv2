import { Request, Response } from 'express'
import { CartItemModel } from '../entities/models/cartItem'
import { validateCartItem } from '../entities/schemas/cartItem'

export class CartItemController {
  cartItemModel: CartItemModel
  constructor ({ cartItemModel }: { cartItemModel: CartItemModel }) {
    this.cartItemModel = cartItemModel
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const movies = await this.cartItemModel.getAll()
    res.status(200).json(movies)
  }

  // getById = async (req: Request, res: Response): Promise<any> => {
  //   const { id } = req.params
  //   const movie = await this.movieModel.getById({ id })
  //   if (movie) return res.json(movie)
  //   res.status(404).json({ message: 'Movie not found' })
  // }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const cartItem = validateCartItem(req.body)
      const newMovie = await this.cartItemModel.create(cartItem)
      res.status(201).json(newMovie)
    } catch (error: any) {
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

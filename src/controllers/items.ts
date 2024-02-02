import { Request, Response } from 'express'
import { validateMovie } from '../entities/schemas/items'

export class MovieController {
  movieModel: any
  constructor ({ movieModel }: { movieModel: any } = { movieModel: null }) {
    this.movieModel = movieModel
  }

  // getAll = async (req: Request, res: Response): Promise<any> => {
  //   const { genre } = req.query
  //   const movies = await this.movieModel.getAll({ genre })
  //   res.json(movies)
  // }

  // getById = async (req: Request, res: Response): Promise<any> => {
  //   const { id } = req.params
  //   const movie = await this.movieModel.getById({ id })
  //   if (movie) return res.json(movie)
  //   res.status(404).json({ message: 'Movie not found' })
  // }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const movie = validateMovie(req.body)
      const newMovie = await this.movieModel.create({ input: movie })
      res.status(201).json(newMovie)
    } catch (error: any) {
      return res.status(400).json({ error: JSON.parse(error) })
    }
  }

  delete = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    const result = await this.movieModel.delete({ id })

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

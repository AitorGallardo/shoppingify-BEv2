export interface Movie {
  title: string
  year: number
  director: string
  duration: number
  rate: number
  poster: string
  genre: Array<'Action' | 'Adventure' | 'Crime' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Thriller' | 'Sci-Fi'>
}

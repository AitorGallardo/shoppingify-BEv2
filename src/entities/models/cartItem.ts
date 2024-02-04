import { CartItem } from './../interfaces/cartItem'
import { Pool } from 'pg'
import { config } from 'dotenv'
import { ParsedQs } from 'qs'

config()

// Set up your PostgreSQL connection pool
const DEFAULT_CONFIG = {
  user: process.env.DB_USER ?? '',
  host: process.env.DB_HOST ?? '',
  database: process.env.DB_NAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1234
}

const pool = new Pool(DEFAULT_CONFIG)

// Define your model functions
export class CartItemModel {
  async getAll ({ category }: { category: string | ParsedQs | string[] | ParsedQs[] | undefined }): Promise<any> {
    const client = await pool.connect()
    try {
      if (category) {
        category = category as string
        const lowerCaseCategory = category.toLowerCase()
        const result = await client.query('SELECT * FROM cart_items WHERE LOWER(category::TEXT) = $1', [lowerCaseCategory])
        return result.rows
      }
      const result = await client.query('SELECT * FROM cart_items')
      return result.rows
    } finally {
      client.release()
    }
  }

  async getById (id: number): Promise<any> {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM cart_items WHERE id = $1', [id])
      return result.rows
    } finally {
      client.release()
    }
  }

  async create (item: CartItem): Promise<any> {
    const { name, price, quantity, category } = item
    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO cart_items(name, price, quantity, category) VALUES($1, $2, $3, $4) RETURNING *',
        [name, price, quantity, category]
      )
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async update (id: number, updates: CartItem): Promise<any> {
    const { name, price, quantity } = updates
    const client = await pool.connect()
    try {
      const result = await client.query(
        'UPDATE cart_items SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
        [name, price, quantity, id]
      )
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async delete (id: number): Promise<any> {
    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM cart_items WHERE id = $1 RETURNING *', [id])
      return result.rows[0]
    } finally {
      client.release()
    }
  }
}

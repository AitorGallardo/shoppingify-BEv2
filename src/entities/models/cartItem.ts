import { CartItem } from './../interfaces/cartItem'
import { Pool } from 'pg'
import { config } from 'dotenv'

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
  async getAll (): Promise<any> {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM cart_items')
      return result.rows
    } finally {
      client.release()
    }
  }

  async create (item: CartItem): Promise<any> {
    const { name, price, quantity } = item
    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO cart_items(name, price, quantity) VALUES($1, $2, $3) RETURNING *',
        [name, price, quantity]
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

import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors'
import { createItemsRouter } from './routes/cartItems'

import { CartItemModel } from './entities/models/cartItem'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/items', createItemsRouter({ cartItemModel: CartItemModel }))

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

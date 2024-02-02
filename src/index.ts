import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors'
import { createItemsRouter } from './routes/items'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/items', createItemsRouter({ movieModel }))

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

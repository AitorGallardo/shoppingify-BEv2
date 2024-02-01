import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})
app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

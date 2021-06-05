import express, { Application } from 'express'
import IndexRoutes from './routes'

// Boot express
const app: Application = express()
const port = 3000

// Application routing
app.use('/', IndexRoutes)

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))

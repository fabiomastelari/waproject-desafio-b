import { Router } from 'express'
import RootRouter from './routes/rootRouter'
import MovieRouter from './routes/movieRouter'

const ApiRouter = Router()

ApiRouter.use('/', RootRouter)
ApiRouter.use('/movies', MovieRouter)

export default ApiRouter

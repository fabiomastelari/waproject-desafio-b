import { Router } from 'express'
import MovieController from '../controllers/movieController'

const MovieRouter = Router()

MovieRouter.get('/', MovieController.list)
MovieRouter.get('/:id', MovieController.get)
MovieRouter.post('/sync', MovieController.sync)

export default MovieRouter

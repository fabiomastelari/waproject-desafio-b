import { Router } from 'express'

const RootRouter = Router()

RootRouter.get('/', (req, res) => {
  res.status(200).send({
    name: 'WA Project Desafio B API',
    version: '0.1.0'
  })
})

export default RootRouter

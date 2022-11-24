import { Router } from 'express'

const RootRouter = Router()

RootRouter.get('/', (req, res) => {
  res.status(200).send({
    title: 'WA Project Desafio B API',
    version: '0.0.1'
  })
})

export default RootRouter

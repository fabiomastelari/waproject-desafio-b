import express from 'express'

const MovieController = {
  list: (req: express.Request, res: express.Response) => {
    // const limit = 10
    // const { page = 1 } = req.query
    try {
      const listResult = {}
      // Call movies domain list
      res.json(listResult)
    } catch (err) {
      if (err instanceof TypeError) {
        res.status(500).send({
          error: err.message,
          stack: err.stack
        })
      } else {
        res.status(500).send({
          error: 'Unknown error',
          stack: ''
        })
      }
    }
  },
  get: (req: express.Request, res: express.Response) => {
    try {
      const getResult = {}
      // Call movies domain list
      res.json(getResult)
    } catch (err) {
      if (err instanceof TypeError) {
        res.status(500).send({
          error: err.message,
          stack: err.stack
        })
      } else {
        res.status(500).send({
          error: 'Unknown error',
          stack: ''
        })
      }
    }
  },
  sync: (req: express.Request, res: express.Response) => {
    try {
      const syncResult = {}
      // Call movies domain sync
      res.json(syncResult)
    } catch (err) {
      if (err instanceof TypeError) {
        res.status(500).send({
          error: err.message,
          stack: err.stack
        })
      } else {
        res.status(500).send({
          error: 'Unknown error',
          stack: ''
        })
      }
    }
  }
}

export default MovieController

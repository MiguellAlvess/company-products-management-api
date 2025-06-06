import { makeCreateProductController } from '../factories/controllers/product.js'

import { Router } from 'express'

export const productsRouter = Router()

productsRouter.post('/', (req, res) => {
    const createProductController = makeCreateProductController()

    const { body, statusCode } = createProductController.execute(req)

    res.status(statusCode).json(body)
})

import { Router } from 'express'
import { makeCreateCompanyController } from '../factories/controllers/company.js'

export const companiesRouter = Router()

companiesRouter.post('/', async (req, res) => {
    const createCompanyController = makeCreateCompanyController()

    const { body, statusCode } = await createCompanyController.execute(req)

    res.status(statusCode).json(body)
})

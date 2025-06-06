import { Router } from 'express'
import {
    makeCreateCompanyController,
    makeGetCompanyByIdController,
} from '../factories/controllers/company.js'

export const companiesRouter = Router()

companiesRouter.get('/:companyId', async (req, res) => {
    const getCompanyByIdController = makeGetCompanyByIdController()

    const { body, statusCode } = await getCompanyByIdController.execute(req)

    res.status(statusCode).json(body)
})
companiesRouter.post('/', async (req, res) => {
    const createCompanyController = makeCreateCompanyController()

    const { body, statusCode } = await createCompanyController.execute(req)

    res.status(statusCode).json(body)
})

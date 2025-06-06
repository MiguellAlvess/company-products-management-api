import { Router } from 'express'
import {
    makeCreateCompanyController,
    makeGetCompanyByIdController,
    makeUpdateCompanyController,
} from '../factories/controllers/company.js'

export const companiesRouter = Router()

companiesRouter.post('/', async (req, res) => {
    const createCompanyController = makeCreateCompanyController()

    const { body, statusCode } = await createCompanyController.execute(req)

    res.status(statusCode).json(body)
})

companiesRouter.get('/:companyId', async (req, res) => {
    const getCompanyByIdController = makeGetCompanyByIdController()

    const { body, statusCode } = await getCompanyByIdController.execute(req)

    res.status(statusCode).json(body)
})

companiesRouter.patch('/:companyId', async (req, res) => {
    const updateCompanyController = makeUpdateCompanyController()

    const { body, statusCode } = await updateCompanyController.execute(req)

    res.status(statusCode).json(body)
})

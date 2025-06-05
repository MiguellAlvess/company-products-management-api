import {
    cnpjAlreadyInUseResponse,
    emailAlreadyInUseResponse,
    serverError,
    created,
    badRequest,
} from '../helpers/index.js'
import {
    CnpjAlreadyInUseError,
    EmailAlreadyInUseError,
} from '../../errors/index.js'
import { createCompanySchema } from '../../schemas/company.js'
import { ZodError } from 'zod'

export class CreateCompanyController {
    constructor(createCompanyUseCase) {
        this.createCompanyUseCase = createCompanyUseCase
    }
    async execute(httpRequest) {
        try {
            console.log('Request body received:', httpRequest.body)
            const params = httpRequest.body

            await createCompanySchema.parseAsync(params)

            const createdCompany =
                await this.createCompanyUseCase.execute(params)

            return created(createdCompany)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof CnpjAlreadyInUseError) {
                return cnpjAlreadyInUseResponse()
            }

            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}

import { ZodError } from 'zod'
import {
    CnpjAlreadyInUseError,
    CompanyNotFoundError,
    EmailAlreadyInUseError,
} from '../../errors/index.js'
import {
    badRequest,
    checkIfIdIsValid,
    cnpjAlreadyInUseResponse,
    companyNotFoundResponse,
    emailAlreadyInUseResponse,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'
import { updateCompanySchema } from '../../schemas/company.js'

export class UpdateCompanyController {
    constructor(updateCompanyUseCase) {
        this.updateCompanyUseCase = updateCompanyUseCase
    }

    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idIsValid = checkIfIdIsValid(companyId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const params = {
                ...httpRequest.body,
            }

            await updateCompanySchema.parseAsync(params)

            const updatedCompany = await this.updateCompanyUseCase.execute(
                companyId,
                params,
            )

            return ok(updatedCompany)
        } catch (error) {
            if (error instanceof CompanyNotFoundError) {
                return companyNotFoundResponse()
            }
            if (error instanceof CnpjAlreadyInUseError) {
                return cnpjAlreadyInUseResponse()
            }
            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse()
            }
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            console.error(error)
            return serverError()
        }
    }
}

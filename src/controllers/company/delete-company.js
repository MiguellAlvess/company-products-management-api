import { CompanyNotFoundError } from '../../errors/company.js'
import {
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteCompanyController {
    constructor(deleteCompanyUseCase) {
        this.deleteCompanyUseCase = deleteCompanyUseCase
    }

    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idIsValid = checkIfIdIsValid(companyId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedCompany =
                await this.deleteCompanyUseCase.execute(companyId)

            return ok(deletedCompany)
        } catch (error) {
            if (error instanceof CompanyNotFoundError) {
                return companyNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}

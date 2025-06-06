import { CompanyNotFoundError } from '../../errors/company.js'
import {
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class GetCompanyByIdController {
    constructor(getCompanyByIdUseCase) {
        this.getCompanyByIdUseCase = getCompanyByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idIsValid = checkIfIdIsValid(companyId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const company = await this.getCompanyByIdUseCase.execute(companyId)

            return ok(company)
        } catch (error) {
            console.error(error)
            if (error instanceof CompanyNotFoundError) {
                return companyNotFoundResponse()
            }
            return serverError()
        }
    }
}

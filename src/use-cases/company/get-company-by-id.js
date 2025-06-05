import { CompanyNotFoundError } from '../../errors/index.js'

export class GetCompanyByIdUseCase {
    constructor(getCompanyByIdRepository) {
        this.getCompanyByIdRepository = getCompanyByIdRepository
    }

    async execute(companyId) {
        const company = await this.getCompanyByIdRepository.execute(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        return company
    }
}

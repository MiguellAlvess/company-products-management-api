import { CompanyNotFoundError } from '../../errors/index'

export class DeleteCompanyUseCase {
    constructor(deleteCompanyRepository, getCompanyByIdRepository) {
        this.deleteCompanyRepository = deleteCompanyRepository
        this.getCompanyByIdRepository = getCompanyByIdRepository
    }

    async execute(companyId) {
        const company = await this.getCompanyByIdRepository.execute(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        return await this.deleteCompanyRepository.execute(companyId)
    }
}

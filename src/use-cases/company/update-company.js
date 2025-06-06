import {
    CnpjAlreadyInUseError,
    EmailAlreadyInUseError,
} from '../../errors/index.js'

export class UpdateCompanyUseCase {
    constructor(
        updateCompanyRepository,
        getCompanyByCnpjRepository,
        getCompanyByEmailRepository,
        passwordHasherAdapter,
    ) {
        this.updateCompanyRepository = updateCompanyRepository
        this.getCompanyByCnpjRepository = getCompanyByCnpjRepository
        this.getCompanyByEmailRepository = getCompanyByEmailRepository
        this.passwordHasherAdapter = passwordHasherAdapter
    }
    async execute(companyId, updateCompanyParams) {
        if (updateCompanyParams.cnpj) {
            const companyWithProvidedCnpj =
                await this.getCompanyByCnpjRepository.execute(
                    updateCompanyParams.cnpj,
                )
            if (
                companyWithProvidedCnpj &&
                companyWithProvidedCnpj.id !== companyId
            ) {
                throw new CnpjAlreadyInUseError(updateCompanyParams.cnpj)
            }
        }

        if (updateCompanyParams.email) {
            const companyWithProvidedEmail =
                await this.getCompanyByEmailRepository.execute(
                    updateCompanyParams.email,
                )
            if (
                companyWithProvidedEmail &&
                companyWithProvidedEmail.id !== companyId
            ) {
                throw new EmailAlreadyInUseError(updateCompanyParams.email)
            }
        }

        const company = {
            ...updateCompanyParams,
        }

        if (updateCompanyParams.password) {
            const hashedPassword = await this.passwordHasherAdapter.execute(
                updateCompanyParams.password,
            )

            company.password = hashedPassword
        }

        const updateCompany = await this.updateCompanyRepository.execute(
            companyId,
            company,
        )

        return updateCompany
    }
}

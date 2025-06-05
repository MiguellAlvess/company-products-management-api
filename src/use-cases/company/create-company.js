import {
    CnpjAlreadyInUseError,
    EmailAlreadyInUseError,
} from '../../errors/index.js'

export class CreateCompanyUseCase {
    constructor(
        createCompanyRepository,
        getCompanyByCnpjRepository,
        getCompanyByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        this.createCompanyRepository = createCompanyRepository
        this.getCompanyByCnpjRepository = getCompanyByCnpjRepository
        this.getCompanyByEmailRepository = getCompanyByEmailRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createCompanyParams) {
        const companyWithProvidedCnpj =
            await this.getCompanyByCnpjRepository.execute(
                createCompanyParams.cnpj,
            )

        if (companyWithProvidedCnpj) {
            throw new CnpjAlreadyInUseError(createCompanyParams.cnpj)
        }

        const companyEmailWithProvidedEmail =
            await this.getCompanyByEmailRepository.execute(
                createCompanyParams.email,
            )

        if (companyEmailWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createCompanyParams.email)
        }

        const companyId = this.idGeneratorAdapter.execute()

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createCompanyParams.password,
        )

        const company = {
            ...createCompanyParams,
            id: companyId,
            password: hashedPassword,
        }

        const createdCompany =
            await this.createCompanyRepository.execute(company)

        return createdCompany
    }
}

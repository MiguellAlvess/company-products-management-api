import { CnpjAlreadyInUseError, EmailAlreadyInUseError } from '../../errors'

export class CreateCompanyUseCase {
    constructor(
        createCompanyRepository,
        getCompanyByIdRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        this.createCompanyRepository = createCompanyRepository
        this.getCompanyByIdRepository = getCompanyByIdRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createCompanyParams) {
        const companyWithProvidedCnpj =
            await this.getCompanyByIdRepository.execute(
                createCompanyParams.cnpj,
            )

        if (companyWithProvidedCnpj) {
            throw new CnpjAlreadyInUseError(createCompanyParams.cnpj)
        }

        const companyEmailWithProvidedEmail =
            await this.getCompanyByIdRepository.execute(
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

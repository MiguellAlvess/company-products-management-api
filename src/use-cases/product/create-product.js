import { CompanyNotFoundError } from '../../errors/index.js'

export class CreateProductUseCase {
    constructor(
        createProductRepository,
        getCompanyByIdRepository,
        idGeneratorAdapter,
    ) {
        ;(this.createProductRepository = createProductRepository),
            (this.getCompanyByIdRepository = getCompanyByIdRepository)
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createProductParams) {
        const companyId = createProductParams.companyId

        const company = await this.getCompanyByIdRepository.execute(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        const productId = this.idGeneratorAdapter.execute()

        const productData = {
            ...createProductParams,
            id: productId,
        }

        const createdProduct =
            await this.createProductRepository.execute(productData)

        return createdProduct
    }
}

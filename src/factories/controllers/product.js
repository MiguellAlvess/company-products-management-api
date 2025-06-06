import { IdGeneratorAdapter } from '../../adapters/index.js'
import { CreateCompanyController } from '../../controllers/index.js'
import {
    PostgresCreateProductRepository,
    PostgresGetCompanyByIdRepository,
} from '../../repositories/index.js'
import { CreateProductUseCase } from '../../use-cases/index.js'

export const makeCreateProductController = () => {
    const createProductRepository = new PostgresCreateProductRepository()
    const getCompanyByIdRepository = new PostgresGetCompanyByIdRepository()
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const createProductUseCase = new CreateProductUseCase(
        createProductRepository,
        getCompanyByIdRepository,
        idGeneratorAdapter,
    )

    const createProductController = new CreateCompanyController(
        createProductUseCase,
    )
    return createProductController
}

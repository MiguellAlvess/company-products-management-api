import {
    PostgresCreateCompanyRepository,
    PostgresGetCompanyByIdRepository,
} from '../../repositories/index.js'
import {
    IdGeneratorAdapter,
    PasswordHasherAdapter,
} from '../../adapters/index.js'
import { CreateCompanyUseCase } from '../../use-cases/index.js'

import { CreateCompanyController } from '../../controllers/index.js'

export const makeCreateCompanyController = () => {
    const getCompanyByIdRepository = new PostgresGetCompanyByIdRepository()
    const createCompanyRepository = new PostgresCreateCompanyRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const createCompanyUseCase = new CreateCompanyUseCase(
        createCompanyRepository,
        getCompanyByIdRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    )

    const createCompanyController = new CreateCompanyController(
        createCompanyUseCase,
    )
    return createCompanyController
}

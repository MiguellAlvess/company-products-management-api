import {
    PostgresCreateCompanyRepository,
    PostgresGetCompanyByCnpjRepository,
    PostgresGetCompanyByEmailRepository,
    PostgresGetCompanyByIdRepository,
} from '../../repositories/index.js'
import {
    IdGeneratorAdapter,
    PasswordHasherAdapter,
} from '../../adapters/index.js'
import {
    CreateCompanyUseCase,
    GetCompanyByIdUseCase,
} from '../../use-cases/index.js'

import {
    CreateCompanyController,
    GetCompanyByIdController,
} from '../../controllers/index.js'

export const makeCreateCompanyController = () => {
    const getCompanyByCnpjRepository = new PostgresGetCompanyByCnpjRepository()
    const getCompanyByEmailRepository =
        new PostgresGetCompanyByEmailRepository()
    const createCompanyRepository = new PostgresCreateCompanyRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const createCompanyUseCase = new CreateCompanyUseCase(
        createCompanyRepository,
        getCompanyByCnpjRepository,
        getCompanyByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    )

    const createCompanyController = new CreateCompanyController(
        createCompanyUseCase,
    )
    return createCompanyController
}

export const makeGetCompanyByIdController = () => {
    const getCompanyByIdRepository = new PostgresGetCompanyByIdRepository()

    const getCompanyByIdUseCase = new GetCompanyByIdUseCase(
        getCompanyByIdRepository,
    )

    const getCompanyByIdController = new GetCompanyByIdController(
        getCompanyByIdUseCase,
    )
    return getCompanyByIdController
}

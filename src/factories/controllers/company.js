import {
    PostgresCreateCompanyRepository,
    PostgresDeleteCompanyRepository,
    PostgresGetCompanyByCnpjRepository,
    PostgresGetCompanyByEmailRepository,
    PostgresGetCompanyByIdRepository,
    PostgresUpdateCompanyRepository,
} from '../../repositories/index.js'
import {
    IdGeneratorAdapter,
    PasswordHasherAdapter,
} from '../../adapters/index.js'
import {
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    GetCompanyByIdUseCase,
    UpdateCompanyUseCase,
} from '../../use-cases/index.js'

import {
    CreateCompanyController,
    DeleteCompanyController,
    GetCompanyByIdController,
    UpdateCompanyController,
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

export const makeUpdateCompanyController = () => {
    const updateCompanyRepository = new PostgresUpdateCompanyRepository()
    const getCompanyByCnpjRepository = new PostgresGetCompanyByCnpjRepository()
    const getCompanyByEmailRepository =
        new PostgresGetCompanyByEmailRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()

    const updateCompanyUseCase = new UpdateCompanyUseCase(
        updateCompanyRepository,
        getCompanyByCnpjRepository,
        getCompanyByEmailRepository,
        passwordHasherAdapter,
    )

    const updateCompanyController = new UpdateCompanyController(
        updateCompanyUseCase,
    )

    return updateCompanyController
}

export const makeDeleteCompanyController = () => {
    const deleteCompanyRepository = new PostgresDeleteCompanyRepository()
    const getCompanyByIdRepository = new PostgresGetCompanyByIdRepository()

    const deleteCompanyUseCase = new DeleteCompanyUseCase(
        deleteCompanyRepository,
        getCompanyByIdRepository,
    )

    const deleteCompanyController = new DeleteCompanyController(
        deleteCompanyUseCase,
    )
    return deleteCompanyController
}

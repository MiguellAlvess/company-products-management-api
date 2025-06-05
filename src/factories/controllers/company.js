import {
    PostgresCreateCompanyRepository,
    PostgresGetCompanyByCnpjRepository,
    PostgresGetCompanyByEmailRepository,
} from '../../repositories/index.js'
import {
    IdGeneratorAdapter,
    PasswordHasherAdapter,
} from '../../adapters/index.js'
import { CreateCompanyUseCase } from '../../use-cases/index.js'

import { CreateCompanyController } from '../../controllers/index.js'

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

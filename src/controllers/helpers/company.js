import { conflict, notFound } from './index.js'

export const cnpjAlreadyInUseResponse = () => {
    return conflict({
        message: 'The provided cnpj is already in use',
    })
}

export const emailAlreadyInUseResponse = () => {
    return conflict({
        message: 'The provided email is already in use',
    })
}

export const companyNotFoundResponse = () => {
    return notFound({
        message: 'Company not found',
    })
}

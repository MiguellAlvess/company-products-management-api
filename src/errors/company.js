export class CnpjAlreadyInUseError extends Error {
    constructor(cnpj) {
        super(`The provided ${cnpj} is already in use`)
        this.name = 'CnpjAlreadyExistsError'
    }
}

export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The provided ${email} is already in use`)
        this.name = 'EmailAlreadyExistsError'
    }
}

export class CompanyNotFoundError extends Error {
    constructor() {
        super(`Company not found`)
        this.name = 'CompanyNotFoundError'
    }
}

export class CnpjAlreadyExistsError extends Error {
    constructor(cnpj) {
        super(`The provided ${cnpj} is already in use`)
        this.name = 'CnpjAlreadyExistsError'
    }
}

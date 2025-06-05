import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetCompanyByCnpjRepository {
    async execute(cnpj) {
        return await prisma.company.findUnique({
            where: {
                cnpj,
            },
        })
    }
}

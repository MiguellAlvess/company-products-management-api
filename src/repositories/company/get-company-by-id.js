import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetCompanyByIdRepository {
    async execute(companyId) {
        return await prisma.company.findUnique({
            where: {
                id: companyId,
            },
        })
    }
}

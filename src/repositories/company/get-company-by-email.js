import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetCompanyByEmailRepository {
    async execute(email) {
        return await prisma.company.findUnique({
            where: {
                email,
            },
        })
    }
}

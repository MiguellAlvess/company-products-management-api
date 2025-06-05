import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetCompanyByEmailRepository {
    async execute(email) {
        return await prisma.restaurant.findUnique({
            where: {
                email,
            },
        })
    }
}

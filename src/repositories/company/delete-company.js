import { prisma } from '../../../prisma/prisma.js'
import { CompanyNotFoundError } from '../../errors/index.js'

export class PostgresDeleteCompanyRepository {
    async execute(companyId) {
        try {
            return await prisma.company.delete({
                where: {
                    id: companyId,
                },
            })
        } catch (error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                // P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new CompanyNotFoundError()
                }
            }

            throw error
        }
    }
}

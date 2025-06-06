import { prisma } from '../../../prisma/prisma.js'
import { CompanyNotFoundError } from '../../errors/index.js'

export class PostgresUpdateCompanyRepository {
    async execute(companyId, updateCompanyParams) {
        try {
            return await prisma.company.update({
                where: {
                    id: companyId,
                },
                data: {
                    ...updateCompanyParams,
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

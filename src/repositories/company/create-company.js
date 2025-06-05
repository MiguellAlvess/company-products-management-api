import { prisma } from '../../../prisma/prisma.js'

export class PostgresCreateCompanyRepository {
    async execute(createCompanyParams) {
        return await prisma.company.create({
            data: createCompanyParams,
        })
    }
}

import { prisma } from '../../../prisma/prisma.js'

export class PostgresCreateProductRepository {
    async execute(createProductParams) {
        return await prisma.product.create({
            data: createProductParams,
        })
    }
}

import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetRestaurantByEmailRepository {
    async execute(email) {
        return await prisma.restaurant.findUnique({
            where: {
                email,
            },
        })
    }
}

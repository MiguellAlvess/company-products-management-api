import { ZodError } from 'zod'
import { badRequest, created, serverError } from '../helpers/index.js'
import { createProductSchema } from '../../schemas/product.js'

export class CreateProductController {
    constructor(createProductUseCase) {
        this.createProductUseCase = createProductUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createProductSchema.parseAsync(params)

            const createdProduct =
                await this.createProductUseCase.execute(params)

            return created(createdProduct)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            console.error(error)
            return serverError()
        }
    }
}

import zod, { z } from 'zod'

export const createProductSchema = zod.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(1, { message: 'Name is required' }),

    price: z
        .number({ required_error: 'Price is required' })
        .positive({ message: 'Price must be a positive number' }),

    stock: z
        .number({ required_error: 'Stock is required' })
        .int({ message: 'Stock must be an integer' })
        .nonnegative({ message: 'Stock cannot be negative' }),

    description: z
        .string({ required_error: 'Description is required' })
        .trim()
        .min(1, { message: 'Description is required' }),

    companyId: z
        .string({ required_error: 'Company ID is required' })
        .uuid({ message: 'Invalid company ID format' }),
})

import zod, { z } from 'zod'
import { validateCNPJ } from '../schemas/utils.js'

export const createCompanySchema = zod.object({
    name: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(1, {
            message: 'Name is required',
        }),

    cnpj: z
        .string({ required_error: 'CNPJ is required' })
        .trim()
        .refine((cnpj) => validateCNPJ(cnpj), {
            message: 'CNPJ is invalid',
        }),

    email: z
        .string({
            required_error: 'Email is required',
        })
        .trim()
        .email({
            message: 'Please provide a valid email address',
        })
        .trim()
        .min(1, {
            message: 'Email is required',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, {
            message: 'Password must be at least 6 characters',
        }),
})

export const updateCompanySchema = createCompanySchema.partial()

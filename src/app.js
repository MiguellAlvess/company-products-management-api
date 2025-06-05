import express from 'express'
import { companiesRouter } from './routes/companies.js'

export const app = express()

app.use(express.json())

app.use('/api/companies', companiesRouter)

import express from 'express'
import { companiesRouter } from './routes/companies.js'

export const app = express()

app.use('/api/companies', companiesRouter)

app.use(express.json())

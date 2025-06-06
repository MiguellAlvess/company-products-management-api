import express from 'express'
import { companiesRouter, productsRouter } from './routes/index.js'

export const app = express()

app.use(express.json())

app.use('/api/companies', companiesRouter)
app.use('./api/products', productsRouter)

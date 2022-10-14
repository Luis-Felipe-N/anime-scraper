import "reflect-metadata"
import cors from 'cors'
import express from 'express'
import { router } from './routes'
import { createConnection } from "./database/dataSource"
const app = express()

createConnection()

app.use(express.json())

app.use(cors())

app.use(router)

app.listen(9999, () => {console.log('Server is running')})
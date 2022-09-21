import "reflect-metadata"
import express from 'express'
import { router } from './routes'
import { createConnection } from "./database/dataSource"

const app = express()

createConnection()

app.use(express.json())

app.use(router)

app.listen(3333, () => {console.log('Server is running in http://localhost:3333')})
import "reflect-metadata"
import cors from 'cors'
import express from 'express'
import { router } from './routes'
import { createConnection } from "./database/dataSource"

import { config } from "dotenv"

config()
const app = express()

const host = process.env.DATABASE_HOST
createConnection(host)

app.use(express.json())

app.use(cors());

app.use(router)

app.listen(3333, () => {console.log('Server is running')})
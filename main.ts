import express from 'express'
import { router } from './src/routes'

const app = express()

app.use(express.json())

app.use(router)

app.listen(3333, () => {
    console.log('==========================================')
    console.log('Server is running in http://localhost:3333')
    console.log('==========================================')
})
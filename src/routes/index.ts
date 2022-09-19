import { Router } from 'express'
import { animeRouter } from './animes.routes'

const router = Router()

router.use('/animes', animeRouter)

router.get('/', (req, res) => {
    res.status(200).json({
        message: '444'
    })
})

export { router }
import { Router } from 'express'
import { animeRouter } from './animes.routes'
import { userRoutes } from './users.routes'

const router = Router()

router.use('/animes', animeRouter)
router.use('/users', userRoutes)

router.get('/', (req, res) => {
    res.status(200).json({
        message: '444'
    })
})

export { router }
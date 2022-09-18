import { Router } from 'express'
import { animeRouter } from './animes.routes'

const router = Router()

router.use('/animes', animeRouter)

export { router }
import { Router } from "express";
import { listAnimesController } from "../modules/Anime/useCases/ListAnimesController";

const animeRouter = Router()

animeRouter.get('/', (req, res) => {
    listAnimesController.handle(req, res)
})

animeRouter.get('/genre', (req, res) => {
    listAnimesController.handle(req, res)
})

export { animeRouter }
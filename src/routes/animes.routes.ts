import { Router } from "express";
import { listAnimesController } from "../modules/Anime/controllers/ListAnimes";
import { uploadAnimesController } from "../modules/Anime/controllers/UploadAnimes";

const animeRouter = Router()

animeRouter.get('/', (req, res) => {
    listAnimesController.handle(req, res)
})

animeRouter.post('/genre', (req, res) => {
    uploadAnimesController.handle(req, res)
})

export { animeRouter }
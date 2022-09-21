import { Router } from "express";
import { ListAnimeBySlugController } from "../controller/ListAnimeBySlugController";
import { ListAnimesController } from "../controller/ListAnimesController";
import { UploadAnimesByGenreController } from "../controller/UploadAnimesByGenreController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle)
animeRouter.get('/:slug', new ListAnimeBySlugController().handle)

// animeRouter.get('/genre/:genre', new ListAnimesController().handle)
// animeRouter.get('/:slug/season/:id', new ListAnimesController().handle)
// animeRouter.get('/:slug/season/:id/episode/:id', new ListAnimesController().handle)

animeRouter.post('/upload/genre', new UploadAnimesByGenreController().handle)

export { animeRouter }
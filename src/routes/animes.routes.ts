import { Router } from "express";
import { ListAnimesController } from "../controller/ListAnimesController";
import { UploadAnimesByGenreController } from "../controller/UploadAnimesByGenreController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle)
animeRouter.post('/upload/genre', new UploadAnimesByGenreController().handle)

export { animeRouter }
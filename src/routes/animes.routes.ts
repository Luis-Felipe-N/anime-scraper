import { Router } from "express";
import { ListAnimesController } from "../module/Anime/ListAnime/ListAnimesController";
import { ListAnimeBySlugController } from "../module/Anime/ListAnimeBySlug/ListAnimeBySlugController";
import { UpdateAnimesByGenreController } from "../module/Anime/UpdateAnimeByGenre/UpdateAnimesByGenreController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle)
animeRouter.get('/:slug', new ListAnimeBySlugController().handle)
animeRouter.get('/:slug/season/:id', new ListAnimesController().handle)

animeRouter.post('/update/genre', new UpdateAnimesByGenreController().handle)

export { animeRouter }
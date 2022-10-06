import { Router } from "express";
import { ListAnimesController } from "../module/Anime/ListAnime/ListAnimesController";
import { ListAnimeBySlugController } from "../module/Anime/ListAnimeBySlug/ListAnimeBySlugController";
import { ListAnimePopularController } from "../module/Anime/ListAnimePopular/ListAnimePopularController";
import { ListEpisodeController } from "../module/Anime/ListEpisode/ListEpisodeController";
import { ListEpisodesByController } from "../module/Anime/ListEpisodesBySeason/ListEpisodesByController";
import { ListSeasonByIdController } from "../module/Anime/ListSeason/ListSeasonByIdController";
import { ListSeasonsByAnimeController } from "../module/Anime/ListSeasonsByAnime/ListSeasonsByAnimeController";
import { UpdateAnimesByGenreController } from "../module/Anime/UpdateAnimeByGenre/UpdateAnimesByGenreController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle) // OK
animeRouter.get('/popular', new ListAnimePopularController().handle) // OK
animeRouter.get('/:slug', new ListAnimeBySlugController().handle) // OK
animeRouter.get('/:slug/seasons/', new ListSeasonsByAnimeController().handle) // OK
animeRouter.get('/season/:seasonId', new ListSeasonByIdController().handle) // OK
animeRouter.get('/season/:seasonId/episodes/', new ListEpisodesByController().handle) // OK
animeRouter.get('/episode/:id', new ListEpisodeController().handle) // OK


animeRouter.post('/update/genre', new UpdateAnimesByGenreController().handle)

export { animeRouter }
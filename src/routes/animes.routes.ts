import { Router } from "express";
import { ListAnimesController } from "../module/Anime/ListAnime/ListAnimesController";
import { GetAnimeBySlugController } from "../module/Anime/GetAnimeBySlug/GetAnimeBySlugController";
import { ListAnimePopularController } from "../module/Anime/ListAnimePopular/ListAnimePopularController";
import { ListAnimesByGenreController } from "../module/Anime/ListAnimesByGenre/ListAnimesByGenreController";
import { ListEpisodeController } from "../module/Anime/ListEpisode/ListEpisodeController";
import { ListEpisodesByController } from "../module/Anime/ListEpisodesBySeason/ListEpisodesByController";
import { ListGenresController } from "../module/Anime/ListGenres/ListGenresController";
import { ListSeasonByIdController } from "../module/Anime/ListSeason/ListSeasonByIdController";
import { ListSeasonsByAnimeController } from "../module/Anime/ListSeasonsByAnime/ListSeasonsByAnimeController";
import { UpdateAnimesByGenreController } from "../module/Anime/UpdateAnimeByGenre/UpdateAnimesByGenreController";
import { ListAnimesBySlugsController } from "../module/Anime/ListAnimesBySlugs/ListAnimesBySlugsController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle) // OK
animeRouter.get('/genres', new ListGenresController().handle)
animeRouter.get('/popular', new ListAnimePopularController().handle) // OK
animeRouter.post('/slugs', new ListAnimesBySlugsController().handle) // OK
animeRouter.get('/:slug', new GetAnimeBySlugController().handle) // OK

animeRouter.get('/season/:seasonId', new ListSeasonByIdController().handle) // OK
animeRouter.get('/season/:seasonId/episodes/', new ListEpisodesByController().handle) // OK
animeRouter.get('/:slug/seasons/', new ListSeasonsByAnimeController().handle) // OK

animeRouter.get('/episode/:episodeId', new ListEpisodeController().handle) // OK

animeRouter.get('/genre/:genreSlug', new ListAnimesByGenreController().handle) // OK
animeRouter.post('/update/genre', new UpdateAnimesByGenreController().handle)

export { animeRouter }
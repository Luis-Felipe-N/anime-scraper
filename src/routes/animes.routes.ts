import { Router } from "express";
import { ListAnimesController } from "../module/Anime/useCases/ListAnime/ListAnimesController";
import { GetAnimeBySlugController } from "../module/Anime/useCases/GetAnimeBySlug/GetAnimeBySlugController";
import { ListAnimePopularController } from "../module/Anime/useCases/ListAnimePopular/ListAnimePopularController";
import { ListAnimesByGenreController } from "../module/Anime/useCases/ListAnimesByGenre/ListAnimesByGenreController";
import { ListEpisodeController } from "../module/Anime/useCases/ListEpisode/ListEpisodeController";
import { GetEpisodeController } from "../module/Anime/useCases/GetEpisode/GetEpisodeController";
import { ListEpisodesByController } from "../module/Anime/useCases/ListEpisodesBySeason/ListEpisodesByController";
import { ListGenresController } from "../module/Anime/useCases/ListGenres/ListGenresController";
import { ListSeasonByIdController } from "../module/Anime/useCases/ListSeason/ListSeasonByIdController";
import { ListSeasonsByAnimeController } from "../module/Anime/useCases/ListSeasonsByAnime/ListSeasonsByAnimeController";
import { UpdateAnimesByGenreController } from "../module/Anime/useCases/UpdateAnimeByGenre/UpdateAnimesByGenreController";
import { ListAnimesBySlugsController } from "../module/Anime/useCases/ListAnimesBySlugs/ListAnimesBySlugsController";

const animeRouter = Router()

animeRouter.get('/', new ListAnimesController().handle) // OK
animeRouter.post('/', new ListAnimesBySlugsController().handle) // OK
animeRouter.get('/genres', new ListGenresController().handle)
animeRouter.get('/popular', new ListAnimePopularController().handle) // OK

animeRouter.post('/episodes/', new ListEpisodeController().handle) // OK
animeRouter.get('/episode/:episodeId', new GetEpisodeController().handle) // OK

animeRouter.get('/genre/:genreSlug', new ListAnimesByGenreController().handle) // OK
animeRouter.post('/update/genre', new UpdateAnimesByGenreController().handle)

animeRouter.get('/season/:seasonId', new ListSeasonByIdController().handle) // OK
animeRouter.get('/season/:seasonId/episodes/', new ListEpisodesByController().handle) // OK
animeRouter.get('/:slug/seasons/', new ListSeasonsByAnimeController().handle) // OK

animeRouter.get('/:slug', new GetAnimeBySlugController().handle) // OK

export { animeRouter }
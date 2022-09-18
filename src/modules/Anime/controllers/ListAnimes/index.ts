import { EpisodesRepository } from "../../repositores/EpisodesRepository";
import { ListAnimesController } from "./ListAnimesController";

const episodesRepository = new EpisodesRepository()

const listAnimesController = new ListAnimesController(episodesRepository)

export { listAnimesController }
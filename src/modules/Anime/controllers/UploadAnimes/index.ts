import { AnimesRepository } from "../../repositores/AnimesRepository"
import { UploadAnimesController } from "./UploadAnimesController"

const animeRepository = new AnimesRepository()
const uploadAnimesController = UploadAnimesController(animeRepository)

export {uploadAnimesController}
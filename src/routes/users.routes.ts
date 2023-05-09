import { Router } from "express"
import { createUserController } from "../module/User/useCases/createUser/createUserController"

const userRoutes = Router()

userRoutes.post("/", new createUserController().handle)

export { userRoutes }
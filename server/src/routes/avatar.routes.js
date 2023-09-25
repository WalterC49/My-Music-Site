import { Router } from "express";
import { userServices } from "../services/user.services.js";

const avatarRouter = Router();

avatarRouter.route("/users/:id").get(userServices.getImageById);

export default avatarRouter;

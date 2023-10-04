import { Router } from "express";
import { songServices } from "../services/song.services.js";

const songRouter = Router();

songRouter.route("/songs/:id").get(songServices.getSongFileById);

export default songRouter;

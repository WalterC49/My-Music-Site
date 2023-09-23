import { Router } from "express";
import { imageUpload } from "../utils/multer.js";
import { sendImage } from "../services/avatar.services.js";

const avatarRouter = Router();

avatarRouter.route("/avatar").post(imageUpload).get(sendImage);

export default avatarRouter;

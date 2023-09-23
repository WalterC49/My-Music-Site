/* import {join} from "path" */
import { userServices } from "./user.services.js";

export const sendImage = (req, res) => {
  const { id } = req.params;
  const imagePath = userServices.getImagePathById(id);
  console.log(__dirname, imagePath);
};

import { UPLOAD_DIRECTORY_IMAGE_PATH, TYPES, SALT } from "../contants/conts.js";
import UserModel from "../models/user.js";
import { storeFile, deleteFile } from "../utils/storeUploads.js";
import bcrypt from "bcryptjs";

const createUser = async ({ user }) => {
  if (user.password !== user.password2)
    throw Error("Las contraseñas no son iguales.");

  const passHash = await bcrypt.hash(user.password, SALT);

  const newUser = new UserModel({
    ...user,
    password: passHash,
    avatarPath: "default-avatar.jpg",
    roles: ["USER", "MODERATOR", "ADMIN"],
  });
  await newUser.save();
  return newUser;
};

const getAllUsers = async () => {
  const users = await UserModel.find();

  return users;
};

const getUserById = async ({ id }) => {
  const user = await UserModel.findById(id);

  return user;
};

const updateUserAvatar = async ({ userId: id, avatarImage }) => {
  const user = await UserModel.findById(id);

  const { avatarPath } = user;

  if (avatarPath !== "default-avatar-jpg") {
    deleteFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath);
  }

  const newAvatarPath = await storeFile(avatarImage, TYPES.IMAGE);

  user.avatarPath = newAvatarPath;
  user.save();
  return user;
};

const getImageById = async (req, res, next) => {
  const { id } = req.params;
  const { avatarPath } = await UserModel.findById(id);

  res.sendFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath, err => {
    if (err) {
      next(err);
    }
  });
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  getImageById,
};

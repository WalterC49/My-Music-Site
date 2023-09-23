import UserModel from "../models/user.js";
import { storeImage } from "../utils/storeUploads.js";

const DEFAULT_AVATAR_URL = new URL(
  "../public/default-avatar.jpeg",
  import.meta.url,
);

/* console.log(DEFAULT_AVATAR_URL.pathname); */

const createUser = async ({ user }) => {
  const newUser = new UserModel({
    ...user,
    avatarPath: DEFAULT_AVATAR_URL.pathname,
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
  const newAvatarPath = await storeImage(avatarImage);
  user.avatarPath = newAvatarPath;
  user.save();
  return user;
};

const getImagePathById = async ({ id }) => {
  const { avatarPath } = await UserModel.findById(id);
  return avatarPath;
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  getImagePathById,
};

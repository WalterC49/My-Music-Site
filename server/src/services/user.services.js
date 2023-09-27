import { UPLOAD_DIRECTORY_IMAGE_PATH, TYPES, SALT } from "../contants/conts.js";
import UserModel from "../models/user.js";
import { storeFile, deleteFile } from "../utils/storeUploads.js";
import bcrypt from "bcryptjs";
import { validations } from "../utils/validations.js";

const createUser = async ({ user }) => {
  await validations.validateCreateUser(user);

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
  validations.validateId(id);
  const user = await UserModel.findById(id);

  validations.userExists(user);

  return user;
};

const updateUserAvatar = async ({ id, avatarImage }) => {
  validations.validateId(id);
  const user = await UserModel.findById(id);

  validations.userExists(user);

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
  validations.validateId(id);
  const user = await UserModel.findById(id);

  validations.userExists(user);

  const { avatarPath } = user;

  res.sendFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath, err => {
    if (err) {
      next(err);
    }
  });
};

const updateUsername = async ({ id, username }) => {
  await validations.validateUsername(username);

  const userToUpdate = await UserModel.findById(id);

  validations.userExists(userToUpdate);

  userToUpdate.username = username;
  userToUpdate.save();

  return userToUpdate;
};

const updateEmail = async ({ id, email }) => {
  await validations.validateEmail(email);

  const userToUpdate = await UserModel.findById(id);

  validations.userExists(userToUpdate);

  userToUpdate.email = email;
  userToUpdate.save();

  return userToUpdate;
};

const updatePassword = async ({ id, oldPass, newPass }) => {
  validations.validateId(id);
  const user = await UserModel.findById(id);

  validations.userExists(user);

  await validations.comparePasswords(oldPass, user.password);

  const passHash = await bcrypt.hash(newPass, SALT);

  user.password = passHash;

  await user.save();

  return user;
};

const deleteUser = async ({ id, password }) => {
  validations.validateId(id);
  const user = await UserModel.findById(id);

  validations.userExists(user);

  await validations.comparePasswords(password, user.password);

  const { avatarPath } = user;

  if (avatarPath !== "default-avatar-jpg") {
    deleteFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath);
  }
  const deletedUser = await UserModel.deleteOne({ _id: id });

  return deletedUser.acknowledged && deletedUser.deletedCount === 1;
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  getImageById,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
};

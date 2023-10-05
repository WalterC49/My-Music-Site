import {
  UPLOAD_DIRECTORY_IMAGE_PATH,
  FILETYPES,
  SALT,
} from "../contants/conts.js";
import UserModel from "../models/user.js";
import { storeFile, deleteFile } from "../utils/storeUploads.js";
import bcrypt from "bcryptjs";
import { validations } from "../utils/validations.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const createUser = async ({ user }) => {
  await validations.validateCreateUser(user);

  const passHash = await bcrypt.hash(user.password, SALT);

  const newUser = new UserModel({
    ...user,
    password: passHash,
    avatarPath: "default-avatar.jpg",
    roles: ["USER"],
  });
  await newUser.save();
  return newUser;
};

const getAllUsers = async context => {
  const { currentUser } = context;

  validations.isAuthenticated(currentUser);

  validations.isAdmin(currentUser);

  const users = await UserModel.find();
  return users;
};

const getUserById = async ({ id }) => {
  validations.validateId(id);
  const user = await UserModel.findById(id).populate("songs");

  validations.userExists(user);

  return user;
};

const updateUserAvatar = async ({ avatarImage }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);

  const { avatarPath } = currentUser;
  if (avatarPath !== "default-avatar.jpg") {
    deleteFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath);
  }

  const newAvatarPath = await storeFile(avatarImage, FILETYPES.IMAGE);
  currentUser.avatarPath = newAvatarPath;
  currentUser.save();
  return currentUser;
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

const updateUsername = async ({ username }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  await validations.validateUsername(username);
  currentUser.username = username;
  currentUser.save();
  return currentUser;
};

const updateEmail = async ({ email }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  await validations.validateEmail(email);
  currentUser.email = email;
  currentUser.save();
  return currentUser;
};

const updatePassword = async ({ oldPass, newPass }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  await validations.comparePasswords(oldPass, currentUser.password);

  const passHash = await bcrypt.hash(newPass, SALT);
  currentUser.password = passHash;
  await currentUser.save();
  return currentUser;
};

const deleteUser = async ({ password }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  await validations.comparePasswords(password, currentUser.password);

  const { avatarPath, _id } = currentUser;

  const deletedUser = await UserModel.deleteOne({ _id });
  if (avatarPath !== "default-avatar.jpg") {
    deleteFile(UPLOAD_DIRECTORY_IMAGE_PATH + avatarPath);
  }
  return deletedUser.acknowledged && deletedUser.deletedCount === 1;
};

const login = async ({ username, password }) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new GraphQLError("Wrong credentials.", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  await validations.comparePasswords(password, user.password);

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return {
    value: jwt.sign(userForToken, process.env.JWT_SECRET),
  };
};

const getUser = async auth => {
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7); // split(" ")[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await UserModel.findById(id).populate("songs");
    return currentUser;
  }
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
  login,
  getUser,
};

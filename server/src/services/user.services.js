import UserModel from "../models/user.js";

const createUser = async ({ user }) => {
  const newUser = new UserModel({
    ...user,
    avatarPath: `public/default-avatar.jpeg`,
    roles: ["USER", "MODERATOR", "ADMIN"],
  });
  await newUser.save();
  return newUser;
};

export const userServices = {
  createUser,
};

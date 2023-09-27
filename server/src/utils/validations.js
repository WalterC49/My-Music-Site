import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

const validateId = id => {
  if (id.length !== 12 || id.length !== 24)
    throw new GraphQLError("The ID is invalid.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });

  return true;
};

const validateUsername = async username => {
  if (username.length < 1)
    throw new GraphQLError("Username must have at least one character.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });

  const user = await UserModel.findOne({ username });

  if (user) {
    throw new GraphQLError("That username is already in use.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
  }

  return true;
};

const validateEmail = async email => {
  if (email.length < 1)
    throw new GraphQLError("Email must have at least one character.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });

  const user = await UserModel.findOne({ email });
  if (user)
    throw new GraphQLError("That email is already in use.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });

  return true;
};

const validatePassword = password => {
  if (password.length < 8)
    throw new GraphQLError("Password must have at least eight characters.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
  return true;
};

const validatePasswords = async (password, password2) => {
  if (password !== password2)
    throw new GraphQLError("The passwords must be equals.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });

  return true;
};

const validateCreateUser = async args => {
  const { username, email, password, password2 } = args;

  await validateUsername(username);
  await validateEmail(email);
  validatePassword(password);
  await validatePasswords(password, password2);
};

const userExists = user => {
  if (!user)
    throw new GraphQLError("That user doesn't exists.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
  return true;
};

const comparePasswords = async (password, hash) => {
  const checkPass = await bcrypt.compare(password, hash);

  if (!checkPass)
    throw new GraphQLError("Unauthorized.", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });

  return true;
};

export const validations = {
  validateId,
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswords,
  validateCreateUser,
  userExists,
  comparePasswords,
};

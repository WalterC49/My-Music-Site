import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

const validateId = id => {
  if (!(id.length === 12 || id.length === 24))
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
  const regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%&?"'¡¿]).{8,21})/;

  if (!regex.test(password))
    throw new GraphQLError(
      `Passwords must have between 8 and 20 characters, at least one upper case letter, one lower case letter, one number and one special character.`,
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
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

const isAuthenticated = currentUser => {
  if (!currentUser) {
    throw new GraphQLError("You are not authenticated.", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};

const isAdmin = currentUser => {
  if (!currentUser.roles.includes("ADMIN")) {
    throw new GraphQLError("You are not authorized to do this.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
};

const songExists = song => {
  if (!song)
    throw new GraphQLError("That song doesn't exists.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
  return true;
};

const validateSongTitle = title => {
  if (title.length < 1)
    throw new GraphQLError(
      "The song's title must have at least one character.",
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
};

const validateSongSinger = singer => {
  if (singer.length < 1)
    throw new GraphQLError(
      "The song's singer must have at least one character.",
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
};

const validateSongLyrics = lyrics => {
  if (lyrics.length < 1)
    throw new GraphQLError(
      "The song's lyrics must have at least one character.",
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
};

const validateSongTags = tags => {
  if (tags.length < 1)
    throw new GraphQLError("The song's tags must have at least one tag.", {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
};

const validateAddSong = song => {
  const { title, singer, lyrics, tags } = song;

  validateSongTitle(title);
  validateSongSinger(singer);
  validateSongLyrics(lyrics);
  validateSongTags(tags);
};

const validateSongSourceTitle = sourceTitle => {
  if (sourceTitle.length < 1)
    throw new GraphQLError(
      "The source's title must have at least one character.",
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
};

const validateSongSourceSinger = sourceSinger => {
  if (sourceSinger.length < 1)
    throw new GraphQLError(
      "The source's singer must have at least one character.",
      {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      },
    );
};

const validateIsCover = song => {
  const { isCover } = song;
  if (isCover) {
    const { sourceTitle, sourceSinger } = song;
    validateSongSourceTitle(sourceTitle);
    validateSongSourceSinger(sourceSinger);
  }
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
  isAuthenticated,
  isAdmin,
  songExists,
  validateAddSong,
  validateIsCover,
  validateSongTitle,
  validateSongSinger,
  validateSongLyrics,
  validateSongTags,
  validateSongSourceTitle,
  validateSongSourceSinger,
};

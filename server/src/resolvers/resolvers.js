import { userServices } from "./../services/user.services.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: (_parent, _args) => {
      return userServices.getAllUsers();
    },
    user: (_parent, { id }) => {
      const user = userServices.getUserById({ id });
      return user;
    },
  },
  Mutation: {
    createUser: (_parent, args) => {
      const user = userServices.createUser(args);
      return user;
    },
    updateUserAvatar: (_parent, args) => {
      const user = userServices.updateUserAvatar(args);
      return user;
    },
    updateUsername: (_parent, args) => {
      const user = userServices.updateUsername(args);
      return user;
    },
    updateEmail: (_parent, args) => {
      const user = userServices.updateEmail(args);
      return user;
    },
    updatePassword: (_parent, args) => {
      const user = userServices.updatePassword(args);
      return user;
    },
    deleteUser: (_parent, args) => {
      const user = userServices.deleteUser(args);
      return user;
    },
  },
};

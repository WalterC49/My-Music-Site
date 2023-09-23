import { userServices } from "./../services/user.services.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: async (parent, args) => {
      return await userServices.getAllUsers();
    },
    user: (parent, { id }) => {
      const user = userServices.getUserById({ id });
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await userServices.createUser(args);
      return user;
    },
    updateUserAvatar: async (parents, args) => {
      const user = await userServices.updateUserAvatar(args);
      return user;
    },
  },
};

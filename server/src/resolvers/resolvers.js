import { userServices } from "./../services/user.services.js";

export const resolvers = {
  Query: {
    users: () => {},
    user: () => {
      return "";
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await userServices.createUser(args);
      return user;
    },
  },
};

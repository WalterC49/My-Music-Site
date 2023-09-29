import { connectDB } from "./config/database.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./schemas/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import { createServer } from "http";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import avatarRouter from "./routes/avatar.routes.js";
import { userServices } from "./services/user.services.js";
connectDB();

const app = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use("/", avatarRouter);

await server.start();
// Apollo-Require-Preflight false
app.use(
  "/",
  cors(),
  express.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";
      const currentUser = await userServices.getUser(auth);
      return { currentUser };
    },
  }),
);

await new Promise(resolve =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);

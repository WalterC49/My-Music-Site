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
connectDB();

const app = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

/* app.use(graphqlUploadExpress()); */
await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  graphqlUploadExpress(),
  expressMiddleware(server),
);

await new Promise(resolve =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);

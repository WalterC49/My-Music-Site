import { connectDB } from "./config/database.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./schemas/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import { createServer } from "http";
connectDB();

const app = express();

const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use("/", cors(), express.json(), expressMiddleware(server));

await new Promise(resolve =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);

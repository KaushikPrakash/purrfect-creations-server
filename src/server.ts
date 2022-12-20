import { ApolloServer } from "apollo-server-express";
import Schema from "./Orders/Schema";
import Resolvers from "./Orders/Resolvers";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

async function startApolloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (error: any) => {
      return {
        statusCode: error.statusCode || 500,
        message: error.message,
      };
    },
  }) as any;

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(Schema, Resolvers);

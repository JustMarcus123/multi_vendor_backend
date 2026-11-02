import mongoose from "mongoose";
import { dbConnection } from "./config/db";
import app from "./app";
import env from "./config/env";

async function start() {
  await dbConnection();

  console.log("MongoDB connected");

  const server = app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}/api/v1`);
  });


  async function shutDown() {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  }

  process.on("SIGINT", shutDown);
  process.on("SIGTERM", shutDown);
}

start().catch((err) => {
  console.error("Failed to start:", err.message);
  process.exit(1);
});
/**
 * Author: Mangkholen chongloi(marcus)
Date Created: 2026-10-22
Description: Handles the database connection and verifies server status.
Version: 1.0.0
Copyright: Copyright (c) 2026 marcus. All rights reserved.
 */

const mongoose = require("mongoose");
const dbConnection = require("./config/db");
const app = require("./app");
const env = require("./config/env");

async function start() {
  await dbConnection;
  console.log("Mongodb connected");

  const server = app.listen(env.port, () => {
    console.log(`API running in port : "http://localhost:${env.port}/api/v1 `);
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
  console.error("failed to start", err.message);
  process.exit(1);
});

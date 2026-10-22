/**
 * Author: Mangkholen chongloi(marcus)
Date Created: 2026-10-22
Description: Handles the database connection and verifies server status.
Version: 1.0.0
Copyright: Copyright (c) 2026 marcus. All rights reserved.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env';

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
// app.use("/api/v1", routes);

app.use(cors({ origin: env.clientOrigin, credentials: true }));
if (env.nodeEnv !== "test") app.use(morgan("dev"));

export default app;

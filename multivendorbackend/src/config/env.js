require("dotenv").config();

const required = ["MONGODB_URI"]; //later few more things will be added for like jwt secret key and all

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,

  //later few exports will be made for jwt secrets and all
};

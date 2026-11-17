import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  mongoUri: requireEnv("MONGODB_URI"),
  jwtAccessSecret: requireEnv("JWT_ACCESS_SECRET"),
};

export default env;
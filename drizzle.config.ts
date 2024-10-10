import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./app/drizzle/schema.ts",
  out: "./app/drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})

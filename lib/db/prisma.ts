import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const database = process.env.DATABASE_NAME;

  if (!host || !user || !database) {
    throw new Error(
      "DATABASE_HOST, DATABASE_USER and DATABASE_NAME must be defined.",
    );
  }

  const adapter = new PrismaMariaDb({
    host,
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user,
    password: process.env.DATABASE_PASSWORD ?? "",
    database,
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

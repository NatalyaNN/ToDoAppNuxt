import { PrismaClient } from "@prisma/client";

const createPrisma = () => {
   return new PrismaClient();
};

declare const globalThis: {
   db: ReturnType<typeof createPrisma>;
} & typeof global;

export const db = globalThis.db ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalThis.db = db;
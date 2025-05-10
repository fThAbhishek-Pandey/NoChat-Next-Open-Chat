import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

// Log the DATABASE_URL environment variable
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  try {
    // Example query to test Prisma
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
 export default prisma
// const env = await load();

// console.log(env['DATABASE_URL']);

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

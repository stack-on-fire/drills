import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //seeding goes here
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

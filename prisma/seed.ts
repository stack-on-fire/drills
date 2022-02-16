import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { drills } from "./drills";

async function main() {
  drills.forEach(async ({ testCases, hints, ...rest }) => {
    await prisma.drill.create({
      data: {
        ...rest,
        hints: {
          create: hints,
        },
        testCases: {
          create: testCases,
        },
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

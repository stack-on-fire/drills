// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;
  const drill = await prisma.drill.findFirst({
    where: {
      functionName: name as string,
    },
    include: {
      testCases: true,
      hints: true,
      completion: true,
    },
  });

  res.status(200).json({ drill });
}

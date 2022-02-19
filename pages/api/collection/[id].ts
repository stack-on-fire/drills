// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log({ id });
  const collection = await prisma.drillCollection.findUnique({
    where: {
      id: id as string,
    },
    include: {
      drills: { include: { hints: true, testCases: true, completion: true } },
    },
  });

  res.status(200).json({ collection });
}

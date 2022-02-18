// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const result = await prisma.drillCompletion.create({
    data: {
      drillId: req.body.id,
      userId: session.user.id,
      solution: req.body.solution,
    },
  });

  res.status(200).json(result);
}

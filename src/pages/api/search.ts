// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type GetSearchResponseType = Array<{
  title: string;
}>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSearchResponseType>
) {
  console.log(req.query.term);
  res.status(200).json([{ title: "John Doe" }]);
}

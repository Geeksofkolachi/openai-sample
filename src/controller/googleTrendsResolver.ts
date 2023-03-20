import { Request, Response } from "express";
import googleTrends from "google-trends-api";

export const googleTrendsResolver = async (req: Request, res: Response) => {
  googleTrends
    .realTimeTrends({
      geo: "US",
      category: "t",
    })
    .then((data: any) => {
      res.status(200).send({
        data: JSON.parse(data),
        status: "Successfully fetch the trends",
      });
    })
    .catch((err: any) => {
      res.status(502).send({ err, status: "Something went wrong!" });
    });
};

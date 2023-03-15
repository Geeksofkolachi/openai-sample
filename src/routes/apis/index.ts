import express, { Request, Response } from "express";
import * as openai from "openai";

const router = express.Router();
const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new openai.OpenAIApi(configuration);

router.post("/", async (req: Request, res: Response) => {
  const query = req.body.query;
  const completion = await openaiApi.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    temperature: 0.6,
    max_tokens: 1000,
  });
  let data = completion.data.choices[0].text || "";
  res.status(200).json({ result: data });
});

module.exports = router;

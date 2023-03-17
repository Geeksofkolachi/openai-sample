import express, { Request, Response } from "express";
import * as openai from "openai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

const router = express.Router();
const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new openai.OpenAIApi(configuration);

const messages: {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}[] = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: "write blog on these keywords",
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: "article must contain atleast 4 headings",
  },
];

router.post("/", async (req: Request, res: Response) => {
  const query = req.body.query;
  //   const completion = await openaiApi.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: query,
  //     temperature: 0.6,
  //     max_tokens: 1000,
  //   });
  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: query,
  });
  try {
    const completion = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
      temperature: 0.6,
      max_tokens: 1000,
    });
    let data = completion.data || "";
    res.status(200).send(data?.choices?.[0]?.message?.content || "");
  } catch (err) {
    console.log({ err });
    res.status(502).send("ERROR");
  }
});

router.post("/image-variations", async (req: Request, res: Response) => {
  const query = req.body.query;
  try {
    const completion = await openaiApi.createImage({
      prompt: query,
    });
    let data = completion.data || "";
    res.status(200).send(data.data);
  } catch (err) {
    console.log({ err });
    res.status(502).send("ERROR");
  }
});

export default router;

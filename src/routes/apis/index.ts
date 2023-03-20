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

router.post("/image-generation", async (req: Request, res: Response) => {
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

// router.post("/image-variations", async (req: any, res: Response) => {
//   // const fileBuffer = req?.files?.image?.data;

//   const file = req.files?.myFile as UploadedFile; // assuming the file is in a field named "myFile"

//   // Create a new form
//   const form = new FormData();

//   // Add the file to the form
//   form.append("file", file, {
//     filename: file.name,
//     contentType: file.mimetype,
//   });

//   // const { name, type, data } = req?.files?.image; // assuming the file data is in a property named "file" on the request body

//   // Create a Blob object from the file data
//   // const blob = new Blob([data], { type });

//   // Create a File object from the Blob
//   // const file = new File([data], name, { type });
//   // const file = req.files?.image as UploadedFile;

//   // const tempFilePath = `./${Date.now()}_${file.name}`;
//   // const tempFileStream = createWriteStream(tempFilePath);

//   // tempFileStream.write(file.data);
//   // tempFileStream.end();
//   // console.log({ image: req?.files?.image });
//   if (!fileBuffer) res.status(400).send("File is required");
//   try {
//     const completion = await openaiApi.createImageVariation(
//       file,
//       2,
//       "256x256",
//       "png"
//     );

//     res.status(200).send(completion.data.data);
//   } catch (err) {
//     console.log({ err: err });
//     res.status(502).send("ERROR");
//   }
// });

export default router;

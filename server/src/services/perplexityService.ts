import dotenv from "dotenv";

dotenv.config();

import Perplexity from "@perplexity-ai/perplexity_ai";

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

export async function ask(query: string) {
  const completion = await client.chat.completions.create({
    model: "sonar",
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    stream: true,
  });

  return completion;
}

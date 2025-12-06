import api from "./api";

interface AIServiceParams {
  query: string;
  blogSlug: string;
}

export const aiService = {
  askPerplexity: async ({ query, blogSlug }: AIServiceParams) => {
    const res = await api.put("/ai/ask-perplexity", { query, blogSlug });
    return res.data;
  },
};

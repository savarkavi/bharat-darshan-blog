interface AIServiceParams {
  query: string;
  blogSlug: string;
  onChunk: (chunk: string) => void;
}

export const aiService = {
  askPerplexity: async ({ query, blogSlug, onChunk }: AIServiceParams) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/ai/ask-perplexity`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, blogSlug }),
      },
    );

    if (!res.ok || !res.body) {
      throw new Error(res.statusText);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);

      onChunk(text);
    }

    return "Stream complete";
  },
};

import api from "./api";

interface SaveDraftParams {
  data: {
    title: string;
    excerpt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    coverImage: string;
    tags: string[];
    category: string;
  };
  slug: string | undefined;
}

export const blogService = {
  saveDraft: async ({ data, slug }: SaveDraftParams) => {
    if (slug) {
      const res = await api.put(`blogs/draft/${slug}`, data);
      return res.data;
    } else {
      const res = await api.post("blogs/draft", data);
      return res.data;
    }
  },

  getBlog: async (slug: string | undefined) => {
    if (!slug) return;

    const res = await api.get(`/blogs/${slug}`);
    return res.data;
  },
};

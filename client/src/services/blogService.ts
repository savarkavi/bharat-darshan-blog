import api from "./api";

interface SaveDraftParams {
  data: FormData;
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

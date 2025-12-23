import type {
  Blog,
  GetAllBlogsResponse,
  GetBlogBySlugData,
} from "../types/types";
import api from "./api";

interface SaveDraftParams {
  data: FormData;
  slug: string | undefined;
}

export const blogService = {
  saveDraft: async ({ data, slug }: SaveDraftParams) => {
    if (slug) {
      const res = await api.put<Blog<string>>(`blogs/draft/${slug}`, data);
      return res.data;
    } else {
      const res = await api.post<Blog<string>>("blogs/draft", data);
      return res.data;
    }
  },

  getBlog: async (slug: string | undefined) => {
    if (!slug) return;

    const res = await api.get<GetBlogBySlugData>(`/blogs/${slug}`);
    return res.data;
  },

  getAllBlogs: async (pageParams: number) => {
    const res = await api.get<GetAllBlogsResponse>(
      `/blogs?page=${pageParams}&limit=9`,
    );
    return res.data;
  },

  createBlog: async () => {
    const res = await api.post("/blogs");
    return res.data;
  },
};

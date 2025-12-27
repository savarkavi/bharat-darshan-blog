export interface Author {
  _id: string;
  fullname: string;
  username: string;
  avatar?: string;
}

export interface PerplexityResearchResult {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  research: any;
}

export interface Blog<TAuthor = Author> {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  coverImage: string;
  tags: string[];
  researchResults: PerplexityResearchResult[];
  createdAt: string;
  updatedAt: string;
  likes: string[];
  author: TAuthor;
}

export interface GetAllBlogsResponse {
  blogs: Blog[];
  currentPage: number;
  hasMore: boolean;
}

export interface User {
  userId: string;
  fullname: string;
  username: string;
  avatar?: string;
  email: string;
  role: "user" | "admin";
}

export interface Comment {
  _id: string;
  blogId: string;
  author: Author;
  content: string;
  parent: string;
  likes: number;
  repliesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetBlogComments {
  comments: Comment[];
  currentPage: number;
  hasMore: boolean;
}

export type GetBlogBySlugData = {
  blog: Blog<Author>;
  totalComments: number;
  parentComments: number;
};

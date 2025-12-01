export interface Author {
  _id: string;
  fullname: string;
  username: string;
  avatar?: string;
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
  createdAt: string;
  updatedAt: string;
  author: TAuthor;
}

export interface GetAllBlogsResponse {
  blogs: Blog[];
  currentPage: number;
  hasMore: boolean;
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  avatar?: string;
  email: string;
  role: "user" | "admin";
}

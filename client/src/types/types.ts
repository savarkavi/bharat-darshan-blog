export interface Blog {
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
  author: {
    _id: string;
    fullname: string;
    username: string;
  };
}

export type PostCardType = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  views: number;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
};
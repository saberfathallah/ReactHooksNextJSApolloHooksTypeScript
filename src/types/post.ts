import { CommentType } from './comment';
import { User } from './user';

export interface PostType {
  userId: User;
  categoryId: string;
  postId: string;
  comments: CommentType[];
  description: string;
  id: string;
  likes: string[];
}

export interface Posts {
  posts: PostType[];
  totalPosts: number;
}


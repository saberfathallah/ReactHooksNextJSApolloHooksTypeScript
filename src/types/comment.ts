import { User } from './user';

export interface CommentType {
    description: string;
    postId: string;
    id: string;
    userId: User;
  }
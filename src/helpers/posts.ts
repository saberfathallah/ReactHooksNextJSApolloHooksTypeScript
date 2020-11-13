import { LIMIT } from '@constants/posts';

const getPaginationCount = (totalPosts: number): number => totalPosts % LIMIT > 0 ? Math.trunc(totalPosts / LIMIT + 1) : totalPosts / LIMIT;

export default getPaginationCount;

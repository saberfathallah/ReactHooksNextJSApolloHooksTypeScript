import PostsCategory from "./PostsCategory";
import GET_POSTS_BY_CATEGORY_ID from "@graphql/posts/getPostsByCategoryId";
import { useQuery } from "../../hooks/useQuery";
import { User } from '../../types/user';

interface PostsCategoryContainerProps {
  userConnected: User;
  currentCategoryId: string;
}

const PostsCategoryContainer = (props: PostsCategoryContainerProps) => {
  const { currentCategoryId, userConnected } = props;

  const { loading, data } = useQuery(GET_POSTS_BY_CATEGORY_ID, {
    variables: { categoryId: currentCategoryId },
  });
  return (
    <PostsCategory
      loading={loading}
      data={data}
      userConnected={userConnected}
    />
  );
};

export default PostsCategoryContainer;

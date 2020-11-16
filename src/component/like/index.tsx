import React from "react";

import { useMutation } from "../../hooks/useMutation";
import { useQuery } from "../../hooks/useQuery";
import ADD_LIKE, {
  updateCacheAfterAddLike,
} from "@graphql/like/mutation/addLike";
import DISLIKE, {
  updateCacheAfterDislike,
} from "@graphql/like/mutation/dislike";
import GET_CURRENT_CATEGORY_ID from "@graphql/client/queries/getCurrentCategoryId";
import Like from "./Like";
import { User } from "../../types/user";
interface LikeContainerProps {
  likes: string[];
  userConnected: User;
  postId: string;
}

const LikeContainer = (props: LikeContainerProps) => {
  const { likes, userConnected, postId } = props;
  const isLiked = likes.includes(userConnected.id);
  const {
    data: { currentCategoryId },
  } = useQuery(GET_CURRENT_CATEGORY_ID);

  const [addLike] = useMutation(ADD_LIKE, {
    optionCache: {
      variables: currentCategoryId,
      updateCacheFunction: updateCacheAfterAddLike,
    },
  });
  const [dislike] = useMutation(DISLIKE, {
    optionCache: {
      variables: currentCategoryId,
      updateCacheFunction: updateCacheAfterDislike,
    },
  });

  return (
    <Like
      addLike={addLike}
      dislike={dislike}
      postId={postId}
      isLiked={isLiked}
      nombreOffLikes={likes.length}
    />
  );
};

export default LikeContainer;

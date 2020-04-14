import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LikeOn from '@public/assets/images/icons/likeOn.svg';
import LikeOff from '@public/assets/images/icons/likeOff.svg';

import ADD_LIKE, { updateCacheAfterAddLike } from '@graphql/like/mutation/addLike';
import DISLIKE, { updateCacheAfterDislike } from '@graphql/like/mutation/dislike';
import GET_CURRENT_CATEGORY_ID from '@graphql/client/queries/getCurrentCategoryId';

const useStyles = makeStyles(() => createStyles({
  heart: {
  },
}));

interface User {
  name: string;
  id: string;
}

interface LikeProps {
  likes: string[];
  userConnected: User;
  postId: string;
}

const Like: React.FC<LikeProps> = (props: LikeProps) => {
  const { likes, userConnected, postId } = props;
  const classes = useStyles();
  const isLiked = likes.includes(userConnected.id);
  const { data: { currentCategoryId } } = useQuery(GET_CURRENT_CATEGORY_ID);

  const [addLike] = useMutation(ADD_LIKE, {
    update: (cache, { data }) => updateCacheAfterAddLike(cache, data, currentCategoryId),
  });
  const [dislike] = useMutation(DISLIKE, {
    update: (cache, { data }) => updateCacheAfterDislike(cache, data, currentCategoryId),
  });

  return (
    <>
      {isLiked
        ? (
          <IconButton
            onClick={(): Promise<object> => dislike({
              variables: { postId },
            })}
            className={classes.heart}
            aria-label="show 11 new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={likes.length}
            >
              <LikeOn style={{ width: '28px' }} />
            </Badge>
          </IconButton>
        ) : (
          <IconButton
            onClick={(): Promise<object> => addLike({
              variables: { postId },
            })}
            className={classes.heart}
            aria-label="show 11 new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={likes.length || 0}
            >
              <LikeOff style={{ width: '28px' }} />
            </Badge>
          </IconButton>
        )}
    </>
  );
};

export default Like;

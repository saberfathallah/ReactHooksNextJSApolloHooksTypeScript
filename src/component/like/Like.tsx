import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LikeOn from '@public/assets/images/icons/likeOn.svg';
import LikeOff from '@public/assets/images/icons/likeOff.svg';

const useStyles = makeStyles(() => createStyles({
  heart: {
    float: 'right',
  },
}));

interface User {
  name: string;
  id: string;
}

interface LikeProps {
  likes: string[];
  userConnected: User;
}
const Like: React.FC<LikeProps> = (props: LikeProps) => {
  const { likes, userConnected } = props;
  const classes = useStyles();
  const isLiked = likes.includes(userConnected.id);

  return (
    <>
      {isLiked
        ? (
          <IconButton className={classes.heart} aria-label="show 11 new notifications" color="inherit">
            <Badge
              badgeContent={likes.length}
            >
              <LikeOn style={{ width: '28px' }} />
            </Badge>
          </IconButton>
        ) : (
          <IconButton className={classes.heart} aria-label="show 11 new notifications" color="inherit">
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

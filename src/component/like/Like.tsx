import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import LikeOn from "@public/assets/images/icons/likeOn.svg";
import LikeOff from "@public/assets/images/icons/likeOff.svg";

const useStyles = makeStyles(() =>
  createStyles({
    heart: {},
  })
);

interface dislikeVariables {
  variables: {
    postId: string;
  };
}

interface addLikeVariables {
  variables: {
    postId: string;
  };
}

interface LikeProps {
  postId: string;
  isLiked: boolean;
  nombreOffLikes: number;
  dislike: (variables: dislikeVariables) => any;
  addLike: (variables: addLikeVariables) => any;
}

const Like: React.FC<LikeProps> = (props: LikeProps) => {
  const { postId, isLiked, nombreOffLikes, dislike, addLike } = props;
  const classes = useStyles();

  return (
    <>
      {isLiked ? (
        <IconButton
          onClick={(): Promise<object> =>
            dislike({
              variables: { postId },
            })
          }
          className={classes.heart}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={nombreOffLikes}>
            <LikeOn style={{ width: "28px" }} />
          </Badge>
        </IconButton>
      ) : (
        <IconButton
          onClick={(): Promise<object> =>
            addLike({
              variables: { postId },
            })
          }
          className={classes.heart}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={nombreOffLikes || 0}>
            <LikeOff style={{ width: "28px" }} />
          </Badge>
        </IconButton>
      )}
    </>
  );
};

export default Like;

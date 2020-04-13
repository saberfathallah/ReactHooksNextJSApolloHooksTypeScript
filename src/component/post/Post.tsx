import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Comments from '../comments';
import Like from '../like';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    maxWidth: 500,
    margin: theme.spacing(2),
  },
  media: {
    height: 250,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  heart: {
    float: 'right',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

interface User {
  name: string;
  id: string;
}

interface Comment {
  userId: User;
  description: string;
  postId: string;
  id: string;
}
interface PostProps {
  categoryId: string;
  postId: string;
  userName: string;
  description: string;
  comments: Comment[];
  userConnected: User;
  creatorId: string;
  likes: string[];
}

const Post: React.FC<PostProps> = (props: PostProps) => {
  const {
    description, comments, userName, categoryId, postId, creatorId, userConnected, likes,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar
            alt="Ted talk"
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
          />
        )}
        action={
          userConnected.id === creatorId && (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={userName}
        subheader="5 hours ago"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            description
          }
        </Typography>
        <Like likes={likes} userConnected={userConnected} />
        <Comments
          creatorId={creatorId}
          userConnected={userConnected}
          comments={comments}
          categoryId={categoryId}
          postId={postId}
        />
      </CardContent>
    </Card>
  );
};

export default Post;

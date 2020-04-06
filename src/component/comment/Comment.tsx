import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DELETE_COMMENT, { updateCacheAfterDeleteComment } from '../../graphql/comments/mutation/deleteComment';

interface IUser {
  name: string;
  id: string;
}

interface ICommetProps {
  name: string;
  description: string;
  creatorId: string;
  userCommentedId: string;
  userConnected: IUser
  postId: string;
  id: string;
  currentCategoryId: string;
}

const Comment: React.FC<ICommetProps> = (props: ICommetProps) => {
  const {
    name,
    description,
    userConnected,
    userCommentedId,
    creatorId, 
    postId,
    id,
    currentCategoryId
  } = props;
  const [isShown, setIsShown] = React.useState(false);
  const [deleteComment] = useMutation<any>(DELETE_COMMENT, { 
    update: (cache, { data }) => updateCacheAfterDeleteComment(cache, data, currentCategoryId) 
  });

  return (
    <div style={{ display: "contents" }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src="" />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={description} />
      {isShown && 
        <div>
          {
            <> 
              {
                ((userConnected.id === userCommentedId) || (userConnected.id === creatorId) ) &&
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteComment({ variables: { deleteCommentInput: { postId, commentId: id } } })}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
              }
              {
                userConnected.id === userCommentedId && 
                  <IconButton aria-label="modify" >
                    <EditIcon />
                  </IconButton>
              }
            </>
            
          }
        </div>
      }
    </div>
  );
} 
  
export default Comment;

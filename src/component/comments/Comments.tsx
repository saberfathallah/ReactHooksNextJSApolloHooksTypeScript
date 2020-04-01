import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
  }),
);

interface IComment {
  description: string;
}
interface ICommentProps {
  comments: IComment[];
}

const Comments: React.FC<ICommentProps> = (props: ICommentProps) => {
  const { comments } = props;
  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {comments.map(({ description }) => (
          <React.Fragment key={description}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src="" />
                </ListItemAvatar>
                <ListItemText primary="hedi kortas" secondary={description} />
              </ListItem>
            </React.Fragment>
          ))}
      </List>
      <TextField
        id="standard-full-width"
        label="Ajouter un commentaire"
        style={{ margin: 8 }}
        placeholder=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
} 
  
export default Comments;

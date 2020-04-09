import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { LIMIT } from '../../constants/posts';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface PaginationControlledProps {
  fetchMorePost: any;
  page: number;
  totalPosts: number;
}

const PaginationControlled:
React.FC<PaginationControlledProps> = (props: PaginationControlledProps) => {
  const classes = useStyles();
  const { page, fetchMorePost, totalPosts } = props;
  const count = totalPosts % LIMIT > 0 ? Math.trunc(totalPosts / LIMIT + 1) : totalPosts / LIMIT;

  return (
    <div className={classes.root}>
      <Pagination count={count} page={page} onChange={fetchMorePost} />
    </div>
  );
};

export default PaginationControlled;

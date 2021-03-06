import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from 'moment';
import React from 'react';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/postActions";
import useStyles from "./styles";
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small"
            onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary"
            onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp;Like&nbsp; {post.likeCount} </Button>
          <Button size="small" color="primary"
            onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
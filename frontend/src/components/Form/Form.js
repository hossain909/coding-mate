import { Button, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/postActions';
import useStyles from "./styles";
// import FileBase from "react-file-base64";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    creator: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData))
    }
    clear()
  }

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    console.log(file);
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result;
      setPostData({ ...postData, selectedFile: base64 })
    }
    reader.readAsDataURL(file)
  }
  const clear = () => {
    setCurrentId(0)
    setPostData({
      title: '',
      creator: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          {/* <FileBase type="file" multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> */}

          <input type="file" onChange={handleImageFile} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
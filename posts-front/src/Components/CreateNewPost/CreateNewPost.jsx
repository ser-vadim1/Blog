import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseStlesCreatePost } from "./usestylesCreatePost";
import { InputBase, Button, InputLabel, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  CreatePost,
  GetOnePostById,
  DeletePost,
  UpdatePost,
  uploadImage,
} from "../../Redux/posts";
import { useGetParametr } from "../../Hooks/useGetParametr";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
const CreatNewPost = () => {
  const onePost = useSelector((state) => state.Posts.onePost);
  const postId = useGetParametr("postId");
  const Dispatch = useDispatch();
  const [body, setBody] = useState({
    title: "",
    fullText: "",
    description: "",
  });
  const classes = UseStlesCreatePost();

  useEffect(() => {
    let onePost = async () => {
      let resultAction = await Dispatch(GetOnePostById(postId));
      if (resultAction.meta.requestStatus === "fulfilled") {
        let _onePost = resultAction.payload;
        setBody({
          title: postId ? _onePost.title : "",
          fullText: postId ? _onePost.fullText : "",
          description: postId ? _onePost.description : "",
        });
      }
    };
    if (postId) {
      onePost();
    } else if (!postId) {
      setBody({ title: "", fullText: "", description: "" });
    }
  }, [Dispatch, postId]);

  const _onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handlerSave = (e) => {
    e.preventDefault();
    if (body.title.length >= 5 && body.fullText.length >= 20 && !postId) {
      Dispatch(CreatePost(body));
      setBody({ title: "", fullText: "", description: "" });
    } else if (body.title.length >= 5 && body.fullText.length >= 20 && postId) {
      Dispatch(UpdatePost({ body: body, postId: postId }));
    }
  };

  const handlerDeletPost = async () => {
    Dispatch(DeletePost(postId));
    setBody({
      title: "",
      fullText: "",
      description: "",
    });
  };

  const handlerChangeImage = async (e) => {
    const File = e.target.files[0];
    let resulAction = await Dispatch(
      uploadImage({ File: File, postId: postId })
    );
    e.target.value = "";
  };

  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <Typography variant="h1" className={classes.inputLableTitle}>
            Title
          </Typography>
          <textarea
            className={classes.textareaTitle}
            autoFocus={true}
            maxLength="20"
            minLength="5"
            name="title"
            onChange={_onChange}
            value={body.title}
          />
          <Typography variant="h1" className={classes.inputLableTitle}>
            Full text
          </Typography>
          <textarea
            maxLength="400"
            minLength="20"
            className={classes.textareaFullText}
            name="fullText"
            onChange={_onChange}
            value={body.fullText}
          />
          <Typography variant="h1" className={classes.inputLableTitle}>
            Description
          </Typography>
          <textarea
            maxLength="80"
            className={classes.textareaDescription}
            name="description"
            value={body.description}
            onChange={_onChange}
          />
          <div className={classes.containerButton}>
            {postId ? (
              <>
                <input
                  accept="image/*"
                  name="avatar"
                  className={classes.inputFile}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handlerChangeImage}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    className={classes.buttonUpload}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
              </>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.buttonSubmit}
              startIcon={<SaveIcon />}
              onClick={(e) => handlerSave(e)}
            >
              Save
            </Button>
            {postId ? (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                // className={classes.button}
                startIcon={<DeleteIcon />}
                className={classes.buttonRemove}
                onClick={handlerDeletPost}
              >
                Remove post
              </Button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatNewPost;

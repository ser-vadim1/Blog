import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetParametr } from "../../Hooks/useGetParametr";
import { useStylesSeeOnePost } from "./useStylesseeOnePost";
import Grid from "@material-ui/core/Grid";
import { GetOnePostById } from "../../Redux/posts";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { DOM_NAME } from "../../Helper/api";
const SeeOnePost = () => {
  const postId = useGetParametr("postId");
  const Dispatch = useDispatch();
  const classes = useStylesSeeOnePost();
  const [onePost, setOnePost] = useState("");
  const lastSeenPost = JSON.parse(localStorage.getItem("lastSeen"));

  useEffect(() => {
    let seen = [];
    if (lastSeenPost && lastSeenPost.length < 4) {
      lastSeenPost.push(postId);
      localStorage.setItem("lastSeen", JSON.stringify(lastSeenPost));
    } else if (lastSeenPost && lastSeenPost.length >= 4) {
      let indexCount = +localStorage.getItem("indexCount");
      lastSeenPost.splice(indexCount, 1, postId);
      indexCount += 1;
      if (indexCount > 3) {
        indexCount = 0;
      }
      localStorage.setItem("indexCount", indexCount);
      localStorage.setItem("lastSeen", JSON.stringify(lastSeenPost));
    } else if (!lastSeenPost) {
      seen.push(postId);
      localStorage.setItem("lastSeen", JSON.stringify(seen));
      localStorage.setItem("indexCount", 0);
    }
  }, []);

  useEffect(() => {
    let _onePost = async () => {
      let resultAction = await Dispatch(GetOnePostById(postId));
      if (resultAction.meta.requestStatus === "fulfilled") {
        let _onePost = resultAction.payload;
        setOnePost({
          title: _onePost.title,
          fullText: _onePost.fullText,
          description: _onePost.description,
          image: _onePost.image,
        });
      }
    };
    if (postId) {
      _onePost();
    }
  }, [postId, Dispatch]);
  return (
    <>
      <Grid container className={classes.root} spacing={2} justify="center">
        <Grid item xs={12} className={classes.item}>
          <Typography variant="h4" align="center">
            {onePost.title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.itemImage}>
          <div className={classes.BoxImage}>
            <img
              src={
                onePost.image
                  ? `${DOM_NAME}${onePost.image}`
                  : "https://oborot.ru/wp-content/uploads/2020/10/78-1.jpg"
              }
              alt="lol"
              className={classes.img}
            ></img>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.itemFullText}>
          <div className={classes.BoxFullText}>
            <Typography component="p" align="center">
              {onePost.fullText}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.itemFullText}>
          <div className={classes.BoxFullText}>
            <Typography component="p" align="center">
              {onePost.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SeeOnePost;

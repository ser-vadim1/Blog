import React, { Fragment, useEffect, useState } from "react";
import { useStylesSearchInput } from "./useStylesSerch";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { generalRouter, ENDPOINT_POSTS } from "../../Helper/api";
import { SearchPosts } from "../../Redux/posts";
import { useDebounce } from "../../Hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";
const SearchInput = () => {
  const classes = useStylesSearchInput();
  const [valueSearch, setValueSearch] = useState("");
  const debouncedValue = useDebounce(valueSearch, 500);
  const Dispatch = useDispatch();
  const { isExact } = useRouteMatch("/");
  const serchedPosts = useSelector((state) => state.Posts.serchedPosts);
  const [isOpenBoardSearch, setIspenBoardSearch] = useState(false);
  const [overflow, setOverflow] = useState(
    serchedPosts.length > 10 ? true : false
  );

  const _onChange = (e) => {
    setValueSearch(e.target.value);
    if (e.target.value) {
      setIspenBoardSearch(true);
    } else if (e.target.value === "") {
      setIspenBoardSearch(false);
    }
  };
  useEffect(() => {
    let search = async () => {
      Dispatch(SearchPosts({ valueSearch: debouncedValue, skiPost: 0 }));
    };
    if (debouncedValue !== "" && isExact) {
      search();
    }
  }, [debouncedValue, Dispatch, valueSearch, isExact]);

  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        setValueSearch("");
        setIspenBoardSearch(false);
      }
    };

    window.addEventListener("keydown", escFunction, false);

    return () => {
      window.removeEventListener("keydown", escFunction);
    };
  }, []);

  const Predict = (stringTitle, valueSearch) => {
    let regex = new RegExp(valueSearch, "i");
    let match = stringTitle.match(valueSearch);
    if (match) {
      let mark = `<mark>${match[0]}</mark>`;
      let replace = stringTitle.replace(regex, mark);
      return replace;
    } else {
      return `<p>${stringTitle}</p>`;
    }
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={valueSearch}
          onChange={_onChange}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />

        <div
          className={clsx(classes.ContainerResulSearched, {
            [classes.openBoard]: isOpenBoardSearch,
            [classes.closeBoard]: !isOpenBoardSearch,
          })}
        >
          {serchedPosts.length ? (
            serchedPosts.map((post) => {
              return (
                <Fragment key={post._id}>
                  <List>
                    <ListItem
                      alignItems="flex-start"
                      button={true}
                      divider={true}
                      className={classes.listItem}
                      component={Link}
                      to={`/seeOnePost?postId=${post._id}`}
                    >
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Predict(post.title, valueSearch),
                          }}
                        ></div>
                      }
                    </ListItem>
                  </List>
                </Fragment>
              );
            })
          ) : (
            <p>No have result</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInput;

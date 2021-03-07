import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ArrRoutes } from "./indexRoute";
import Drawermenu from "../Components/Header/DrawersMenu/DrawersMenu";
import CreatNewPost from "../Components/CreateNewPost/CreateNewPost";
import { useSelector } from "react-redux";

const RouterLaylaout = () => {
  const isAuth = useSelector((state) => state.Auth.isAuth);
  return (
    <Router>
      <Switch>
        {ArrRoutes.map((el, key) => {
          if (isAuth && el.protect) {
            return (
              <Route exact path={el.path} key={key}>
                <Drawermenu Content={el.Component} />
              </Route>
            );
          } else if (!el.protect) {
            return (
              <Route exact path={el.path} key={key}>
                <Drawermenu Content={el.Component} />
              </Route>
            );
          }
        })}
      </Switch>
    </Router>
  );
};

export default RouterLaylaout;

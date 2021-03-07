import React from "react";
import { useStylesMainContent } from "./useStylesMainContent";
import { Div } from "../Header/DrawersMenu/StyledDrawers";
const MainContent = () => {
  let classes = useStylesMainContent();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Div>
          <p>lol</p>
        </Div>
      </main>
    </>
  );
};

export default MainContent;

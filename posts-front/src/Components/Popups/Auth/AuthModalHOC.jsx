import React, { useEffect } from "react";

export const ModalAuthHoc = (Components) => (props) => {
  return <Components {...props} />;
};

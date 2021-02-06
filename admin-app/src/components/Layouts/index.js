import React from "react";
import Header from "../Header";
const Layouts = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
export default Layouts;

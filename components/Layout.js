import React from "react";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default (props) => {
  return (
    <Container>
      <Navbar />
      {props.children}
    </Container>
  );
};

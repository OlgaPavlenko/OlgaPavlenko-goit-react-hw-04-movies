import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class Spinner extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="Rings"
        color="#303f9f"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}

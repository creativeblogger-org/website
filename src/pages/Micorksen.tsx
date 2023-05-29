import { Component } from "solid-js";
import MicorksenLol from "../assets/gif/lol-micorksen.gif";

const Micorksen: Component = () => {
  return (
    <div>
      <img
        class="mx-auto h-screen m-5"
        src={MicorksenLol}
        alt="On rigole bien Micorksen !"
      />
    </div>
  );
};

export default Micorksen;

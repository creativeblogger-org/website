import { Component } from "solid-js";
import CBGIF from "../assets/img/CreativeBlogger.gif";

const Loading: Component = () => {
  return (
    <div class="flex justify-center w-full">
      <img src={CBGIF} class="rounded-xl" loading="lazy" alt="" />
    </div>
  );
};

export default Loading;

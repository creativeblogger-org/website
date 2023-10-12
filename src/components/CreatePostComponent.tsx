import { Component } from "solid-js";
import { NavLink } from "@solidjs/router";

const CreatePostComponent: Component = () => {
  return (
    <NavLink
      href="/create"
      class="bg-teal-500 duration-200 border-0 hover:bg-indigo-500 hover:text-teal-500 rounded-full w-auto h-auto p-4 text-indigo-500 text-5xl fixed right-0 bottom-0"
    >
      +
    </NavLink>
  );
};

export default CreatePostComponent;

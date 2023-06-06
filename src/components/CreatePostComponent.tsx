import { Component } from "solid-js";
import { NavLink } from "@solidjs/router";

const CreatePostComponent: Component = () => {
  return (
    <NavLink href="/create"
      class="bg-teal-500 duration-150 hover:bg-indigo-500 rounded-full border p-4 text-5xl fixed right-0 bottom-0"
    >
      +
    </NavLink>
  );
};

export default CreatePostComponent;

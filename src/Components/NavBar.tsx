import { Component, lazy } from "solid-js";
import imgNavNar from "../Assets/img/CB.webp";
import { NavLink } from "@solidjs/router";

const NavBar: Component = () => {
  return (
    <div class="bg-slate-800 h-56 m-auto w-11/12 p-8 my-6 rounded-md text-center">
      <img
        src={imgNavNar}
        class=" h-12 mx-auto"
        alt="Image officielle de Creative Blogger"
      />
      <br />
      <NavLink
        class="text-white mt-4 text-4xl font-coco duration-500 hover:text-yellow-500"
        href="/"
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-center">
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-yellow-500"
          href="/about"
        >
          About
        </NavLink>
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-yellow-500"
          href="/about"
        >
          Contact
        </NavLink>
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-yellow-500"
          href="/about"
        >
          Guide
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;

import { Component } from "solid-js";
import imgNavNar from "../assets/img/cb-logo.png";
import { NavLink } from "@solidjs/router";

const NavBar: Component = () => {
  return (
    <div class="nav-bar">
      <img
        src={imgNavNar}
        class=" h-20 mx-auto"
        alt="Image officielle de Creative Blogger"
      />
      <NavLink
        class="text-white mt-4 text-4xl font-gears text-transparent bg-clip-text bg-gradient-to-br from-teal-300 to-teal-800"
        href="/"
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-center">
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-teal-300"
          href="/login"
        >
          Login
        </NavLink>
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-teal-300"
          href="/register"
        >
          Register
        </NavLink>
        <NavLink
          class="text-white text-2xl p-5 duration-500 hover:text-teal-300"
          href="/contact"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;

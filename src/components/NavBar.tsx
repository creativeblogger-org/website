import { Component } from "solid-js";
import { NavLink } from "@solidjs/router";

import Logo from "../assets/img/logo.png";

const NavBar: Component = () => {
  return (
    <div class="text-center bg-slate-800 p-4 mt-6 mx-auto rounded-md w-11/12">
      <img src={Logo} alt="Logo de Creative Blogger" class="h-16 mx-auto m-3" />
      <NavLink
        class=" mt-4 text-4xl font-gears text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500"
        href="/"
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-center">
        <NavLink
          class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
          href="/login"
        >
          Login
        </NavLink>
        <NavLink
          class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
          href="/register"
        >
          Register
        </NavLink>
        <NavLink
          class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
          href="/contact"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;

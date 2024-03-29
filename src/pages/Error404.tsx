import { Component } from "solid-js";
import imgError404 from "../assets/img/404.png";
import { NavLink } from "@solidjs/router";
import Banner from "../assets/img/banner.png";

const Error404: Component = () => {
  return (
    <div>
      <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 text-center text-6xl font-bold mt-5">
        Ouups, vous semblez perdu !
      </h1>
      <img
        loading="lazy"
        class="mx-auto"
        src={imgError404}
        alt="Image erreur 404"
      />
      <div class="flex justify-center">
        <NavLink
          class="text-white text-2xl duration-200 hover:rounded-2xl shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 p-4 flex justify-center rounded-md"
          href="/"
        >
          Retour en lieu sûr
        </NavLink>
        <img src={Banner} alt="Bannière de CB" class="hidden" />
      </div>
      <br />
    </div>
  );
};

export default Error404;

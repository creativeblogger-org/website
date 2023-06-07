import { Component } from "solid-js";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import imgError404 from "../assets/img/404.png";
import { NavLink } from "@solidjs/router";

const Error404: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Oups, Erreur 404 !</Title>
        <Meta
          name="description"
          content="Ouuups, vous semblez perdu ! Vous avez recherché une page qui n'existe pas. Retournez en lieu sûr !"
        />
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 text-center text-6xl font-bold">
          Ouups, vous semblez perdu !
        </h1>
        <img class="mx-auto" src={imgError404} alt="Image erreur 404" />
        <div class="flex justify-center">
          <NavLink
            class="text-white text-2xl duration-200 hover:rounded-2xl shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 p-4 flex justify-center rounded-md"
            href="/"
          >
            Retour en lieu sûr
          </NavLink>
        </div>
        <br />
      </div>
    </MetaProvider>
  );
};

export default Error404;

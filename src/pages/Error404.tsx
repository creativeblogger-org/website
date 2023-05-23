import { Component, lazy } from "solid-js";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { useFavicon } from "solidjs-use";
import imgError404 from "../assets/img/404.png";
import { NavLink } from "@solidjs/router";

const [icon, setIcon] = useFavicon();

setIcon("/src/assets/img/CB.webp");

const Error404: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Oups, Erreur 404 !</Title>
        <Meta
          name="description"
          content="Ouuups, vous semblez perdu ! Vous avez recherché une page qui n'existe pas. Retournez en lieu sûr !"
        />
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-teal-300 text-center text-6xl font-bold">
          Ouups, vous semblez perdu !
        </h1>
        <img class="mx-auto" src={imgError404} alt="Image erreur 404" />
        <div class="flex justify-center">
          <NavLink
            class="text-teal-300 text-2xl bg-gradient-to-r from-indigo-950 to-violet-800 p-4 flex justify-center rounded-md"
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

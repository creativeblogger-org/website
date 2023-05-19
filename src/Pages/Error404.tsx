import { Component, lazy } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { useFavicon } from "solidjs-use";
import imgError404 from "../Assets/img/404-img.png";

const [icon, setIcon] = useFavicon();

setIcon("/src/Assets/img/CB.webp");

const NavBar = lazy(() => import("../Components/NavBar"));
const Footer = lazy(() => import("../Components/Footer"));

const Error404: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Oups, Erreur 404 !</Title>
        <Meta
          name="description"
          content="Ouuups, vous semblez perdu ! Vous avez recherché une page qui n'existe pas. Retournez en lieu sûr !"
        />
        <NavBar />
        <h1 class="text-yellow-500 text-center text-6xl font-bold">
          Ouups, vous semblez perdu !
        </h1>
        <img class="mx-auto" src={imgError404} alt="Image erreur 404" />
        <div class="flex justify-center">
          <a
            class="text-yellow-500 text-2xl bg-slate-800 p-4 flex justify-center rounded-md"
            href="/"
          >
            Retour en lieu sûr
          </a>
        </div>
        <br />
        <Footer />
      </div>
    </MetaProvider>
  );
};

export default Error404;

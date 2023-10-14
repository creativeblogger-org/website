import { Component } from "solid-js";
import CBLogo from "../assets/img/logo2.png";
import CBBanner from "../assets/img/banner.png";
import Error404 from "../assets/img/404.png";

const BrandPage: Component = () => {
  return (
    <div>
      <h1 class="text-center text-3xl mt-5">Branding Page</h1>
      <p class="text-center italic mb-5">
        Découvrez nos logos, couleurs et tout ce qui fait l'identité de Creative
        Blogger
      </p>
      <div class="mx-auto w-1/3">
        <hr />
        <img src={CBLogo} class="h-28 mb-4" alt="Logo de CB" />
        <a
          href={CBLogo}
          class="text-center block text-2xl duration-150 text-teal-500 hover:text-indigo-500 hover:underline"
          download
        >
          Télécharger
        </a>
        <hr />
        <img src={CBBanner} alt="Bannière de CB" />
        <a
          href={CBBanner}
          class="text-center block text-2xl duration-150 text-teal-500 hover:text-indigo-500 hover:underline"
          download
        >
          Télécharger
        </a>
        <hr />
        <img src={Error404} alt="Image de la page d'erreur 404 de CB" />
        <a
          href={Error404}
          class="text-center block text-2xl duration-150 text-teal-500 hover:text-indigo-500 hover:underline"
          download
        >
          Télécharger
        </a>
        <hr />
        <div class="grid grid-cols-3">
          <div class="bg-slate-800 mx-1 h-28 flex justify-center items-center rounded-md">
            <p class="text-white text-2xl">#1e283b</p>
          </div>
          <div class="bg-teal-500 h-28 flex justify-center items-center rounded-md">
            <p class="text-white text-2xl">#16b7a6</p>
          </div>
          <div class="bg-indigo-500 mx-1 h-28 flex justify-center items-center rounded-md">
            <p class="text-white text-2xl">#6365ef</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default BrandPage;

import { Component } from "solid-js";
import CBLogo from "../assets/img/logo2.png";
import { NavLink } from "@solidjs/router";
import TwitterLogo from "../assets/button_icons/twitter.png";

const Footer: Component = () => {
  return (
    <footer class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 mx-auto w-full bottom-0">
      <div class="grid grid-cols-1 sm:grid-cols-2 w-full">
        <div class="about-us-container sm:flex-col w-full">
          <h1 class="uppercase text-white font-pangolin">
            <img
              src={CBLogo}
              alt="Creative Blogger logo"
              width={24}
              height={24}
              class="inline-block"
            />{" "}
            Creative Blogger
          </h1>
          <p class="text-white w-3/4 font-garamond md:text-xl text-base">
            Creative Blogger est un projet open source collaboratif entre
            bloggers. Notre but est de créer un endroit centralisé dans lequel
            plusieurs bloggers viendront publier leurs articles pour se faire
            connaître.
          </p>
        </div>
        <div class="links-container sm:flex-col grow text-center w-full">
          <h1 class="text-white font-garamond md:text-xl text-lg">Liens :</h1>
          <ul class="list-none">
            <li>
              <NavLink
                class=" text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="/"
              >
                - Page d'accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="/about"
              >
                - A propos de nous
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="/shorts"
              >
                - Short Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="https://twitter.com/cblogorg1"
              >
                <img src={TwitterLogo} alt="Logo twitter" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <p class="text-center text-white mt-2 font-garamond md:text-xl text-lg">
        Ce site est sous la{" "}
        <a
          href="https://opensource.org/license/mit/"
          target="_blank"
          class="text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
        >
          licence MIT
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

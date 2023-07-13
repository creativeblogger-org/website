import { Component } from "solid-js";
import CBLogo from "../assets/img/logo2.png";
import { NavLink } from "@solidjs/router";

const Footer: Component = () => {
  return (
    <footer class="bg-slate-800 p-8 mx-auto w-full bottom-0">
      <div class="flex justify-between">
        <div class="about-us-container flex-col">
          <h1 class="uppercase text-white">
            <img
              src={CBLogo}
              alt="Creative Blogger logo"
              width={24}
              height={24}
              class="inline-block"
            />{" "}
            Creative Blogger
          </h1>
          <p class="text-white w-3/4">
            Creative Blogger est un projet open source collaboratif entre
            bloggers. Notre but est de créer un endroit centralisé dans lequel
            plusieurs bloggers viendront publier leurs articles pour se faire
            connaître.
          </p>
        </div>
        <div class="links-container flex-col grow text-center">
          <h1 class="text-white">Liens :</h1>
          <ul class="list-none">
            <li>
              <NavLink
                class=" text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
                href="/"
              >
                - Page d'accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
                href="/about"
              >
                - A propos de nous
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
                href="/shorts"
              >
                - Short Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <p class="text-center text-white mt-4">
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

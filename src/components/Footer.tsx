import { Component } from "solid-js";
import CBLogo from "../assets/img/cb-logo.png";

const Footer: Component = () => {
  return (
    <footer class="bg-slate-800 p-8 my-6 mx-auto rounded-md w-11/12">
      <div class="grid grid-cols-2">
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
              <a
                class=" text-teal-500 duration-150 hover:text-indigo-500"
                href="/posts"
              >
                - Posts
              </a>
            </li>
            <li>
              <a
                class="text-teal-500 duration-150 hover:text-indigo-500"
                href="/about"
              >
                - About
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="text-center text-white">
        Ce site est sous la{" "}
        <a
          href="https://opensource.org/license/mit/"
          target="_blank"
          class="text-teal-500 duration-150 hover:text-indigo-500"
        >
          licence MIT
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

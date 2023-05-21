import { Component } from "solid-js";
import CBLogo from "../assets/img/cb-logo.png";

const Footer: Component = () => {
  return (
    <footer class="bg-gradient-to-r from-indigo-950 to-violet-800 h-auto m-auto w-11/12 p-8 my-6 rounded-md">
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
                class="text-white duration-500 hover:text-teal-300"
                href="/posts"
              >
                - Posts
              </a>
            </li>
            <li>
              <a
                class="text-white duration-500 hover:text-teal-300"
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
          class="text-teal-300"
        >
          licence MIT
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
import { Component } from "solid-js";
import CBLogo from "../assets/img/logo2.png";
import { NavLink } from "@solidjs/router";
import TwitterLogo from "../assets/button_icons/twitter.png";
import Githublogo from "../assets/button_icons/github.png";
import DiscordLogo from "../assets/button_icons/discord.png";
import InstaLogo from "../assets/button_icons/insta.png";
import MastodonLogo from "../assets/button_icons/mastodon.svg";
import ElementLogo from "../assets/button_icons/element.png";
import YtbLogo from "../assets/button_icons/ytb.png";

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
          <div class="grid grid-cols-7 w-3/5 sm:w-4/5 lg:3/5 md:w-3/5 xl:w-2/5 my-2">
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://twitter.com/cblogorg1"
            >
              <img
                loading="lazy"
                src={TwitterLogo}
                class="m-0 p-0"
                alt="Logo twitter"
              />
            </NavLink>
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://github.com/creativeblogger-org"
            >
              <img
                loading="lazy"
                src={Githublogo}
                class="m-0 p-0"
                alt="Logo github"
              />
            </NavLink>
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://discord.gg/uT8zVVn6rQ"
            >
              <img
                loading="lazy"
                src={DiscordLogo}
                class="m-0 p-0"
                alt="Logo discord"
              />
            </NavLink>
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://www.instagram.com/creativebloggerofficial/"
            >
              <img
                loading="lazy"
                src={InstaLogo}
                class="m-0 p-0"
                alt="Logo instgram"
              />
            </NavLink>
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://mastodon.social/invite/xco2jaQu"
            >
              <img
                loading="lazy"
                src={MastodonLogo}
                class="m-0 p-0"
                alt="Logo mastodon"
              />
            </NavLink>
            <NavLink
              class="my-1 mx-2 pb-2 duration-150 hover:border-b-2"
              href="https://matrix.to/#/#creative-blogger:matrix.org"
            >
              <img
                loading="lazy"
                src={ElementLogo}
                class="m-0 p-0"
                alt="Logo element"
              />
            </NavLink>
          </div>
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
                href="/app"
              >
                - Application
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="/terms"
              >
                - Terms
              </NavLink>
            </li>
            <li>
              <NavLink
                class="text-teal-500 duration-150 font-garamond md:text-xl text-lg hover:text-indigo-500 hover:underline"
                href="/brand"
              >
                - Brand
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

import { Component, Show, createSignal, onMount } from "solid-js";
import { NavLink } from "@solidjs/router";
import Logo from "../assets/img/logo2.png";
import LogoutImg from "../assets/button_icons/logout.png";
import ProfileImg from "../assets/button_icons/profile.png";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  isConnected,
  isNotConnected,
} from "../utils/functions_utils";
import { fetch_posts_by_tags, setPosts } from "../pages/Home";
import ThemeSwitcher from "./ThemeSwitcher";

const [isLoading, setIsLoading] = createSignal(false);
const [page, setPage] = createSignal(1);

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch(
    `https://api.creativeblogger.org/posts?limit=20&page=${page() - 1}`
  );

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
  setIsLoading(false);
}

function delete_cookie() {
  document.cookie = "token" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}

const [infos, setInfos] = createSignal({} as User);

async function getInfos() {
  const res = await customFetch(`https://api.creativeblogger.org/@me/`, "GET");

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  setInfos(await res.json());
}

async function logout() {
  const res = await customFetch(
    `https://api.creativeblogger.org/auth/logout`,
    "GET"
  );
  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  delete_cookie();
  displaySuccess("Vous avez été déconnecté avec succès !");
  location.assign("/");
}

const NavBar: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isOpenMore, setIsOpenMore] = createSignal(false);

  function toggleMenu() {
    setIsOpen(!isOpen());
  }

  function toggleMenuMore() {
    setIsOpenMore(!isOpenMore());
  }

  function handleClickOutside(event: any) {
    const dropdownMenu = document.getElementById("dropdown-menu");
    const isClickedOutside =
      !event.target.closest("#dropdown-btn") &&
      !event.target.closest("#dropdown-menu");
    if (isClickedOutside && dropdownMenu) {
      setIsOpen(false);
    }
  }

  function handleClickOutsideMore(event: any) {
    const dropdownMenu = document.getElementById("dropdown-menu-more");
    const isClickedOutside =
      !event.target.closest("#dropdown-btn-more") &&
      !event.target.closest("#dropdown-menu-more");
    if (isClickedOutside && dropdownMenu) {
      setIsOpen(false);
    }
  }

  onMount(() => {
    if (isConnected() === true) {
      getInfos();
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickOutsideMore);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleClickOutsideMore);
    };
  });

  return (
    <div class="text-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 mx-auto w-full">
      <img src={Logo} alt="Logo de Creative Blogger" class="h-16 mx-auto m-1" />
      <NavLink
        class="sm:mt-4 mt-0 text-4xl md:text-5xl font-pangolin text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500"
        href="/"
        onclick={fetch_posts}
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-between">
        <div class="m-2 mt-4 sm:m-4">
          {/* <NavLink
            class="text-teal-500 md:text-2xl md:p-5 p-2 duration-150 hover:text-indigo-500 hover:underline"
            href="/about"
          >
            A Propos
          </NavLink> */}
          <button
            id="dropdown-btn-more"
            class="text-teal-500 font-semibold sm:inline-flex rounded items-center hidden sm:visible"
            onclick={toggleMenuMore}
          >
            <span class="sm:mr-1 text-xl sm:text-2xl md:text-3xl font-garamond">
              Plus
            </span>
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12.586l-4.293-4.293a1 1 0 0 1 1.414-1.414L10 9.758l3.879-3.879a1 1 0 1 1 1.414 1.414L10 12.586zM10 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </button>
          {isOpenMore() && (
            <div
              id="dropdown-menu-more"
              class="absolute text-gray-700 pt-1 bg-white dark:bg-slate-700 rounded shadow-md"
            >
              <ul>
                <li class="flex">
                  <NavLink
                    class="rounded-t bg-white dark:bg-slate-700 w-full duration-150 font-garamond text-xl md:text-2xl hover:underline hover:bg-gray-400 dark:hover:bg-slate-800 hover:text-indigo-500 z-10 py-2 px-4 block whitespace-no-wrap"
                    href="/about"
                    onclick={toggleMenuMore}
                  >
                    Notre équipe
                  </NavLink>
                </li>
                <li class="flex">
                  <NavLink
                    class="rounded-b bg-white dark:bg-slate-700 duration-150 font-garamond text-xl md:text-2xl hover:underline hover:bg-gray-400 dark:hover:bg-slate-800 hover:text-indigo-500 py-2 z-10 px-4 block whitespace-no-wrap"
                    href="/become"
                    onclick={toggleMenuMore}
                  >
                    Nous rejoindre
                  </NavLink>
                </li>
                <li class="flex m-2 justify-center">
                  <div class="rounded-b bg-white dark:bg-slate-700 duration-150 w-full font-garamond text-xl md:text-2xl hover:underline hover:bg-gray-400 dark:hover:bg-slate-800 hover:text-indigo-500 py-2 z-10 px-4 block whitespace-no-wrap">
                    <ThemeSwitcher />
                  </div>
                </li>
              </ul>
            </div>
          )}
          <NavLink
            class="text-teal-500 font-garamond text-xl sm:text-2xl md:text-3xl md:p-5 p-1 w-full duration-150 hover:text-indigo-500 hover:underline"
            href="/shorts"
          >
            Short Blog
          </NavLink>
        </div>
        <div class="m-2 mt-4 sm:m-4">
          <Show when={isNotConnected()}>
            <NavLink
              class="text-teal-500 font-garamond text-xl sm:text-2xl md:text-3xl md:p-5 sm:p-2 px-1 duration-150 hover:text-indigo-500 hover:underline"
              href="/login"
            >
              Connexion
            </NavLink>
            <NavLink
              class="text-teal-500 font-garamond text-xl sm:text-2xl md:text-3xl md:p-5 sm:p-2 px-1 duration-150 hover:text-indigo-500 hover:underline"
              href="/register"
            >
              Inscription
            </NavLink>
          </Show>
          <Show when={isConnected()}>
            <button
              id="dropdown-btn"
              class="text-teal-500 font-semibold rounded inline-flex items-center"
              onclick={toggleMenu}
            >
              <span class="mr-1 text-3xl font-garamond">
                {infos().username}
              </span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12.586l-4.293-4.293a1 1 0 0 1 1.414-1.414L10 9.758l3.879-3.879a1 1 0 1 1 1.414 1.414L10 12.586zM10 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </button>
            {isOpen() && (
              <div
                id="dropdown-menu"
                class="absolute text-gray-700 pt-1 right-0 bg-white dark:bg-slate-700 rounded shadow-md"
              >
                <ul>
                  <li class="flex">
                    <img src={ProfileImg} class="" alt="Profile Img" />
                    <NavLink
                      class="rounded-t bg-white dark:bg-slate-700 w-full font-garamond text-xl md:text-2xl duration-150 hover:underline hover:bg-gray-400 dark:hover:bg-slate-800 hover:text-indigo-500 z-10 py-2 px-4 block whitespace-no-wrap"
                      href="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li class="flex">
                    <img src={LogoutImg} class="" alt="Logout Img" />
                    <NavLink
                      class="rounded-b bg-white dark:bg-slate-700 duration-150 font-garamond text-xl md:text-2xl hover:underline hover:bg-gray-400 dark:hover:bg-slate-800 hover:text-indigo-500 py-2 z-10 px-4 block whitespace-no-wrap"
                      href="/"
                      onclick={logout}
                    >
                      Déconnexion
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </Show>
        </div>
      </div>
      <div class="flex justify-center">
        <NavLink
          class="px-1 sm:px-3 md:px-5 pb-3 hover:border-b-2 hover:font-bold border-teal-500 text-transparent font-garamond bg-clip-text bg-gradient-to-l from-teal-500 to-indigo-500 text-xl sm:text-2xl md:text-3xl duration-75 hover:bg-gradient-to-br"
          href=""
          onclick={() => {
            fetch_posts_by_tags("news");
          }}
        >
          Actualités
        </NavLink>
        <NavLink
          class="px-2 sm:px-3 md:px-5 pb-3 hover:border-b-2 hover:font-bold border-teal-500 font-garamond text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 to-teal-500 text-xl sm:text-2xl md:text-3xl duration-75 hover:bg-gradient-to-br"
          href=""
          onclick={() => {
            fetch_posts_by_tags("tech");
          }}
        >
          Tech
        </NavLink>
        <NavLink
          class="px-2 sm:px-3 md:px-5 pb-3 hover:border-b-2 hover:font-bold border-teal-500 text-transparent font-garamond bg-clip-text bg-gradient-to-l from-teal-500 to-indigo-500 text-xl sm:text-2xl md:text-3xl duration-75 hover:bg-gradient-to-br"
          href=""
          onclick={() => {
            fetch_posts_by_tags("culture");
          }}
        >
          Culture
        </NavLink>
        <NavLink
          class="px-1 sm:px-3 md:px-5 pb-3 hover:border-b-2 hover:font-bold border-teal-500 font-garamond text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 to-teal-500 text-xl sm:text-2xl md:text-3xl duration-75 hover:bg-gradient-to-br"
          href=""
          onclick={() => {
            fetch_posts_by_tags("fakeorreal");
          }}
        >
          Démystification
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
export { getInfos, infos };

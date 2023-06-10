import { Component, Show, createSignal, onMount } from "solid-js";
import { NavLink } from "@solidjs/router";

import Logo from "../assets/img/logo.png";
import LogoutImg from "../assets/button_icons/logout.png";
import ProfileImg from "../assets/button_icons/profile.png";
import HelpImg from "../assets/button_icons/help.png";

import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  isConnected,
  isNotConnected,
} from "../utils/functions_utils";

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

  function toggleMenu() {
    setIsOpen(!isOpen());
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

  onMount(() => {
    if (isConnected() === true) {
      getInfos();
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <div class="text-center bg-slate-800 p-4 mt-6 mx-auto rounded-md w-11/12">
      <img src={Logo} alt="Logo de Creative Blogger" class="h-16 mx-auto m-3" />
      <NavLink
        class=" mt-4 text-3xl md:text-4xl font-gears text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500"
        href="/"
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-between">
        <div class="m-4">
          <NavLink
            class="text-teal-500 md:text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
            href="/about"
          >
            A Propos
          </NavLink>
        </div>
        <div class="m-4">
          <Show when={isNotConnected()}>
            <NavLink
              class="text-teal-500 md:text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
              href="/login"
            >
              Connexion
            </NavLink>
            <NavLink
              class="text-teal-500 md:text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
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
              <span class="mr-1 text-3xl">{infos().username}</span>
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
                class="absolute text-gray-700 pt-1 bg-white rounded shadow-md"
              >
                <ul>
                  <li class="flex">
                    <img src={ProfileImg} class="" alt="Profile Img" />
                    <NavLink
                      class="rounded-t bg-white w-full duration-150 hover:underline hover:bg-gray-400 hover:text-indigo-500 py-2 px-4 block whitespace-no-wrap"
                      href="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li class="flex">
                    <img src={LogoutImg} class="" alt="Logout Img" />
                    <NavLink
                      class="rounded-b bg-white duration-150 hover:underline hover:bg-gray-400 hover:text-indigo-500 py-2 px-4 block whitespace-no-wrap"
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
    </div>
  );
};

export default NavBar;
export { getInfos, infos };

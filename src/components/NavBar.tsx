import { Component, Show } from "solid-js";
import { NavLink } from "@solidjs/router";

import Logo from "../assets/img/logo.png";
import RegisterIcon from "../assets/button_icons/register.png";

import { Dropdown, Ripple, initTE } from "tw-elements";
import {
  customFetch,
  displayError,
  displaySuccess,
  getCookie,
  getError,
  isConnected,
  isNotConnected,
} from "../utils/functions_utils";

initTE({ Dropdown, Ripple });

function delete_cookie() {
  document.cookie = "token" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
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
  return (
    <div class="text-center bg-slate-800 p-4 mt-6 mx-auto rounded-md w-11/12">
      <img src={Logo} alt="Logo de Creative Blogger" class="h-16 mx-auto m-3" />
      <NavLink
        class=" mt-4 text-4xl font-gears text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500"
        href="/"
      >
        Creative Blogger
      </NavLink>
      <div class="flex justify-between">
        <div class="m-4">
          <NavLink
            class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
            href="/about"
          >
            A Propos
          </NavLink>
        </div>
        <div class="m-4">
          <Show when={isNotConnected()}>
            <NavLink
              class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
              href="/login"
            >
              Connexion
            </NavLink>
            <NavLink
              class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
              href="/register"
            >
              Inscription
            </NavLink>
          </Show>
          <Show when={isConnected()}>
            <NavLink
              class="text-teal-500 text-2xl p-5 duration-150 hover:text-indigo-500 hover:underline"
              href="/"
              onclick={logout}
            >
              Déconnexion
            </NavLink>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import { Component } from "solid-js";
import { NavLink } from "@solidjs/router";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import { API_URL } from "../App";

const Login: Component = () => {
  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Ravis de vous revoir !
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            class="space-y-6"
            action=""
            onsubmit={async (e) => {
              e.preventDefault();

              const res = await customFetch(
                `${API_URL}/auth/login`,
                "POST",
                new FormData(document.querySelector("form") as HTMLFormElement),
                false
              );

              if (!res.ok) {
                displayError(getError(await res.json()));
                return;
              }

              const credentials: AuthSuccess = await res.json();
              document.cookie = `token=${credentials.token}`;

              displaySuccess("Connecté avec succès ! Redirection...");

              setTimeout(() => location.assign("/"), 2000);
            }}
          >
            <div>
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Adresse mail ou nom d'utilisateur :
              </label>
              <div class="mt-2">
                <input
                  name="username"
                  id="username"
                  type="text"
                  autocomplete="off"
                  required
                  class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Mot de passe :
                </label>
              </div>
              <div class="mt-2">
                <input
                  name="password"
                  id="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full duration-200 hover:rounded-2xl justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sésame ouvre-toi
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
            Pas encore inscrit ?{" "}
            <NavLink
              href="/register"
              class="font-semibold duration-150 leading-6 text-teal-500 hover:text-indigo-500"
            >
              Lancez-vous dans l'aventure
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

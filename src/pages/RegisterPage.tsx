import { Component, createSignal } from "solid-js";
import { NavLink } from "@solidjs/router";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import { API_URL } from "../App";

const Register: Component = () => {
  const [userBirthdate, setUserBirthdate] = createSignal("");

  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Ravis de vous accueillir !
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action=""
            onsubmit={async (e) => {
              e.preventDefault();

              const name = (
                document.getElementById("username") as HTMLInputElement
              ).value;
              const email = (
                document.getElementById("email") as HTMLInputElement
              ).value;
              const password = (
                document.getElementById("password") as HTMLInputElement
              ).value;

              var convertedDate = new Date(userBirthdate()).toISOString();

              const res = await customFetch(
                `${API_URL}/auth/register`,
                "POST",
                JSON.stringify({
                  username: name,
                  email: email,
                  password: password,
                  birthdate: convertedDate,
                })
              );

              if (!res.ok) {
                displayError(getError(await res.json()));
                return;
              }

              const credentials: AuthSuccess = await res.json();
              document.cookie = `token=${credentials.token}; expires=${new Date(
                Date.now() + 353894400000
              ).toUTCString()}`;

              displaySuccess("Compte créé avec succès ! Redirection...");

              setTimeout(() => location.assign("/"), 2000);
            }}
          >
            <div>
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Nom d'utilisateur :{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="off"
                class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
                required
              />
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Adresse mail :
              </label>
              <div class="mt-2">
                <input
                  name="email"
                  id="email"
                  type="email"
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
              <label
                for="confirm-password"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Confirmer le mot de passe :
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                required
                class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              />
              <label
                for="birthdate"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Date de naissance
              </label>
              <input
                type="date"
                name="birthdate"
                value={userBirthdate() ?? ""}
                onInput={(e) => {
                  setUserBirthdate(e.target.value);
                }}
                id="birthdate"
                required
                class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              />
            </div>
            <div class=" pt-3">
              <button
                type="submit"
                class="flex duration-200 hover:rounded-2xl w-full justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sésame crée-toi
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
            Déjà un compte ?{" "}
            <NavLink
              href="/login"
              class="font-semibold leading-6 text-teal-500 duration-150 hover:text-indigo-500"
            >
              Connectez-vous
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

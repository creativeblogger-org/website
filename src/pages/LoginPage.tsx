import { Component, createSignal, lazy } from "solid-js";
import Logo from "../assets/img/cb-logo.png";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { NavLink } from "@solidjs/router";

const [error, setError] = createSignal("");

interface RegisterError {
  message: string;
  rule: string;
  field: string;
}

interface RegisterErrorJson {
  errors: RegisterError[];
}

interface RegisterSuccess {
  type: string;
  token: string;
}

const NavBar = lazy(() => import("../components/NavBar"));
const Footer = lazy(() => import("../components/Footer"));

const Login: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Login</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div>
        <NavBar />
        <div class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-16 w-auto" src={Logo} alt="Your Company" />
            <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Ravis de vous revoir !
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              class="space-y-6"
              action=""
              onsubmit={async (e) => {
                e.preventDefault();

                let res = await fetch(
                  "https://api.creativeblogger.org/auth/login",
                  {
                    method: "POST",
                    body: new FormData(
                      document.querySelector("form") as HTMLFormElement
                    ),
                  }
                );

                if (!res.ok) {
                  let json: RegisterErrorJson = await res.json();
                  setError(json.errors[0].message);
                  return;
                }

                let credentials: RegisterSuccess = await res.json();
                document.cookie = `type=${credentials.type}`;
                document.cookie = `token=${credentials.token}`;
                location.assign("/");
              }}
            >
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
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
                    class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mot de passe :
                  </label>
                  {/* <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Mot de passe oublié ?
                  </a>
                </div> */}
                </div>
                <div class="mt-2">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-950 to-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sésame ouvre-toi
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Pas encore inscrit ?{" "}
              <NavLink
                href="/register"
                class="font-semibold leading-6 text-indigo-600 duration-100 hover:text-indigo-500"
              >
                Lancez-vous dans l'aventure
              </NavLink>
            </p>
            <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
          </div>
        </div>
        <Footer />
      </div>
    </MetaProvider>
  );
};

export default Login;

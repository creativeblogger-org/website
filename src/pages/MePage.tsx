import { Component, Show, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  findPermissions,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { MetaProvider, Title } from "@solidjs/meta";
import { NavLink } from "@solidjs/router";
import { displaySuccess } from "../utils/functions_utils";
import { delete_cookie, getInfos, infos, logout } from "../components/NavBar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ky from "ky";
import { getToken } from "../utils/functions_utils";
import { API_URL } from "../App";

async function deleteUser() {
  const res = await customFetch(
    `${API_URL}/@me`,
    "DELETE"
  );
  delete_cookie();
  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Votre compte a été supprimé avec succès");
  setTimeout(() => location.assign("/"), 1000);
}

function verif() {
  let person = prompt("Veuillez entrer votre pseudo pour vérifier", "");

  if (person === infos().username) {
    deleteUser();
  } else {
    displayError("Vous avez annulé la suppression de votre compte");
  }
}

const MePage: Component = () => {
  onMount(() => {
    getInfos();
  });

  function isWriter() {
    if (infos().permission === 2) {
      return true;
    }
  }

  async function deleteImage() {
    const res = await customFetch(
      `${API_URL}/@me/delete`,
      "DELETE"
    );

    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    displaySuccess("Votre image de profile a été supprimé avec succès");
    getInfos();
  }

  const [selectedImage, setSelectedImage] = createSignal<File | null>(null);

  async function handleImageUpload() {
    if (!selectedImage()) return;

    try {
      // Récupérer le token d'authentification
      const token = getToken();

      // Créer une instance ky avec les en-têtes
      const api = ky.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formData = new FormData();
      formData.append("image", selectedImage());

      // Effectuer la requête POST en utilisant l'instance ky avec les en-têtes
      const response = await api.post(
        `${API_URL}/@me/upload`,
        {
          body: formData,
        }
      );

      if (response.ok) {
        displaySuccess("L'image a été uploadée !");
        getInfos();
        // Effectuer les actions supplémentaires si nécessaire
      } else {
        displayError("L'image n'a pas été uploadée");
      }
    } catch (error) {
      displayError("L'image n'a pas été uploadée" + error);
    }
  }

  function handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      setSelectedImage(inputElement.files[0]);
    }
    displaySuccess("Votre image est prête !");
  }

  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - {infos().username}</Title>
      </div>
      <h1 class="text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-5xl m-5">
        Votre profil :
      </h1>
      <div class="text-center text-teal-500 text-2xl">
        <div class="flex flex-col">
          <p class="text-3xl text-black dark:text-white">Photo :</p>
          <img class="h-20" src={infos().pp} alt="Vous n'avez pas de photo" />
        </div>
        <div class="flex justify-center">
          <label
            for="dropzone-file"
            class="flex items-center justify-center w-2/6 md:w-1/6 m-5 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
              </p>
            </div>
            <input
              type="file"
              name="file"
              id="dropzone-file"
              class="hidden"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
          </label>
          <div class="flex items-center">
            <button
              onClick={handleImageUpload}
              class="mb-4 duration-200 h-14 hover:rounded-2xl justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload Image
            </button>
            <button
              onclick={deleteImage}
              class="mb-4 mx-5 h-14 duration-200 hover:rounded-2xl justify-center rounded-md shadow-orange-500/50 bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Delete image
            </button>
          </div>
        </div>

        <form
          id="update-infos-form"
          onsubmit={async (e) => {
            e.preventDefault();

            const res = await customFetch(
              `${API_URL}/@me`,
              "PUT",
              new FormData(
                document.getElementById("update-infos-form") as HTMLFormElement
              ),
              false
            );

            if (!res.ok) {
              displayError(getError(await res.json()));
              return;
            }

            getInfos();
            displaySuccess("Informations mises jour avec succès !");
          }}
        >
          <label class="text-3xl text-black dark:text-white" for="username">
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            class="p-2 rounded-md border m-5 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            name="username"
            id="username"
            value={infos().username}
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black dark:text-white" for="email">
            Adresse email :
          </label>
          <input
            type="email"
            class="p-2 rounded-md border m-5 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            name="email"
            id="email"
            value={infos().email}
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black dark:text-white" for="password">
            Changer le mot de passe :
          </label>
          <input
            type="password"
            class="p-2 rounded-md border m-5 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            name="password"
            id="password"
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black dark:text-white">
            Permissions :
          </label>
          <h2 class="p-4">{findPermissions(infos().permission)}</h2>
          <label class="text-3xl text-black dark:text-white">Créé le :</label>
          <h2 class="p-4">{getHumanDate(infos().created_at)}</h2>
          <Show when={infos().created_at !== infos().created_at}>
            <label class="text-3xl text-black">Modifier le :</label>
            <h2 class="p-4">{getHumanDate(infos().update_at)}</h2>
          </Show>
          <button
            class="flex mx-auto mb-4 w-1/3 duration-200 hover:rounded-2xl justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Mettre à jour
          </button>
        </form>
        <p class="text-black dark:text-white">Date de naissance :</p>
        <h2>{(new Date(Date.parse(infos().birthdate))).toLocaleDateString()}</h2>
        <div class="flex justify-center m-5">
          <h1 class="text-black dark:text-white mx-5">Thème :</h1>
          <ThemeSwitcher />
        </div>

        <hr class="p-2" />
        <Show when={infos().permission >= 1}>
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/create"
          >
            Créer un article
          </NavLink>
        </Show>
        <hr class="m-2 p-2" />
        <Show when={infos().permission === 3}>
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/admin"
          >
            Pannel Admin
          </NavLink>
          <hr class="m-2 p-2" />
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/social"
          >
            Page réseaux sociaux
          </NavLink>
        </Show>
        <br />
        <br />
        <button
          onclick={verif}
          class="mx-auto w-1/3 sm:w-1/2 md:w-1/6 bg-red-500 text-white p-2 rounded-md mb-4"
        >
          Supprimer mon compte
        </button>
      </div>
    </MetaProvider>
  );
};

export default MePage;

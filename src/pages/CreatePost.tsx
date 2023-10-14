import { Component, Show, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  getToken,
} from "../utils/functions_utils";
import { fetch_posts } from "./Home";
import { Marked } from "@ts-stack/markdown";
import ky from "ky";
import { API_URL } from "../App";

interface UploadResponse {
  path: string;
}

const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);
const [selectedValue, setSelectedValue] = createSignal("");

function handleRadioChange(event: any) {
  setSelectedValue(event.target.value);
  console.log(selectedValue());
}

async function onPostSubmit(e: Event) {
  e.preventDefault();

  const title = (
    document.getElementById("create-post-title") as HTMLInputElement
  ).value;
  const description = (
    document.getElementById("create-post-description") as HTMLInputElement
  ).value;
  const content = (
    document.getElementById("create-post-content") as HTMLInputElement
  ).value;
  const image = (
    document.getElementById("create-post-image") as HTMLInputElement
  ).value;
  const age_required = (
    document.getElementById("create-age-required") as HTMLInputElement
  ).value;

  const res = await customFetch(
    "https://api.creativeblogger.org/posts",
    "POST",
    JSON.stringify({
      title: title,
      description: description,
      content: content,
      tags: selectedValue(),
      image: image,
      required_age: age_required,
    })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post publié avec succès !");
  fetch_posts();
}

async function fetch_users() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/verif/writer`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const users: User[] = await res.json();
  setUsers(users.reverse());
  setIsLoading(false);
}

const CreatePost: Component = () => {
  const [text, setText] = createSignal("");

  function handleInputChange(event: any) {
    setText(event.target.value);
  }

  function handleBoldClick() {
    wrapTextSelection("**");
  }

  function handleItalicClick() {
    wrapTextSelection("*");
  }

  function handleCodeClick() {
    wrapTextSelection("`");
  }

  function handleLinkClick() {
    wrapSelection("[le lien](https://creativeblogger.org)");
  }

  function handleImageClick() {
    wrapSelection(
      "![nom de votre image](https://creativeblogger.org/image.png)"
    );
  }

  function handleHrClick() {
    wrapSelection("\n\n---\n");
  }

  function handleYtbClick() {
    wrapSelection(
      "[![](https://markdown-videos.vercel.app/youtube/VIDEO_ID)](https://www.youtube.com/watch?v=VIDEO_ID)"
    );
  }

  function handleListClick() {
    wrapSelection("- ");
  }

  function handleCenterClick() {
    wrapTextSelection('<div style="text-center">');
  }

  function wrapTextSelection(wrapper: any) {
    const textarea = document.getElementById(
      "create-post-content"
    ) as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = textarea;
    const selectedText = text().substring(selectionStart, selectionEnd);
    const newText = `${text().substring(
      0,
      selectionStart
    )}${wrapper}${selectedText}${wrapper}${text().substring(selectionEnd)}`;
    setText(newText);
  }

  function wrapSelection(wrapper: any) {
    const textarea = document.getElementById(
      "create-post-content"
    ) as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = textarea;
    const newText = `${text().substring(
      0,
      selectionStart
    )}${wrapper}${text().substring(selectionEnd)}`;
    setText(newText);
  }

  const [selectedImage, setSelectedImage] = createSignal<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = createSignal<string | null>(
    null
  );
  const [fullUploadedImagePath, setFullUploadedImagePath] = createSignal("");

  async function handleImageUpload() {
    if (!selectedImage()) return;

    try {
      const token = getToken();

      const api = ky.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formData = new FormData();
      formData.append("image", selectedImage());

      const response = await api.post(`${API_URL}/posts/upload`, {
        body: formData,
      });

      if (response.ok) {
        const responseData: UploadResponse = await response.json();
        displaySuccess("L'image a été uploadée !");
        setUploadedImagePath(responseData.path);
        setFullUploadedImagePath(
          `${API_URL}/public/posts/${responseData.path}`
        );
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

  onMount(() => {
    fetch_users();
  });
  return (
    <div>
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
            accept=""
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
          <Show when={uploadedImagePath()}>
            <br />
            <p class="mx-2">Image uploadée !</p>
          </Show>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <form
          class="p-10 rounded-xl text-center w-11/12"
          id="post-form"
          onsubmit={onPostSubmit}
        >
          <h1 class="text-4xl pb-5 text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500">
            Créer un post
          </h1>
          <label class="pb-3" for="title">
            Titre du post :{" "}
          </label>
          <input
            type="text"
            name="title"
            id="create-post-title"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
          />
          <br />
          <label class="pb-3" for="image">
            URL de l'image du post : ( 104 x 104 px )
          </label>
          <input
            type="text"
            name="image"
            id="create-post-image"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
            value={fullUploadedImagePath()}
            placeholder="Uploadez une image, le lien se mettera automatiquement !"
          />
          <br />
          <label class="pb-3" for="description">
            Description du post :{" "}
          </label>
          <input
            type="text"
            name="description"
            id="create-post-description"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
          />
          <br />
          <label class="pb-3" for="age-required">
            Âge minimal pour voir l'article :{" "}
          </label>
          <input
            type="number"
            name="age-required"
            id="create-age-required"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
            placeholder="Mettez un nombre"
          />
          <br />
          <label class="pb-3" for="tags">
            Tags du post :{" "}
          </label>
          <br />
          <div class="inline-flex items-center">
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="news"
              data-ripple-dark="true"
            >
              <input
                id="news"
                name="theme"
                value="news"
                onChange={handleRadioChange}
                checked={selectedValue() === "news"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="news"
            >
              Actualités
            </label>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="tech"
              data-ripple-dark="true"
            >
              <input
                id="tech"
                name="theme"
                value="tech"
                onChange={handleRadioChange}
                checked={selectedValue() === "tech"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="tech"
            >
              Tech
            </label>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="culture"
              data-ripple-dark="true"
            >
              <input
                id="culture"
                name="theme"
                value="culture"
                onChange={handleRadioChange}
                checked={selectedValue() === "cuture"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="culture"
            >
              Culture
            </label>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="fakeorreal"
              data-ripple-dark="true"
            >
              <input
                id="fakeorreal"
                name="theme"
                value="fakeorreal"
                onChange={handleRadioChange}
                checked={selectedValue() === "fakeorreal"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="fakeorreal"
            >
              Démystification
            </label>
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="sport"
              data-ripple-dark="true"
            >
              <input
                id="sport"
                name="theme"
                value="sport"
                onChange={handleRadioChange}
                checked={selectedValue() === "sport"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="sport"
            >
              Sport
            </label>
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="cinema"
              data-ripple-dark="true"
            >
              <input
                id="cinema"
                name="theme"
                value="cinema"
                onChange={handleRadioChange}
                checked={selectedValue() === "cinema"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="cinema"
            >
              Cinéma
            </label>
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="litterature"
              data-ripple-dark="true"
            >
              <input
                id="litterature"
                name="theme"
                value="litterature"
                onChange={handleRadioChange}
                checked={selectedValue() === "litterature"}
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-teal-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-teal-500 opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#6366f1"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </div>
            </label>
            <label
              class="mt-px cursor-pointer select-none font-light text-gray-700 dark:text-white"
              for="litterature"
            >
              Littérature
            </label>
          </div>
          <br />
          <label for="content">Contenu : </label>
          <br />
          <br />
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:font-bold"
            type="button"
            onClick={handleBoldClick}
          >
            Gras
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:italic"
            type="button"
            onClick={handleItalicClick}
          >
            Italique
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleCodeClick}
          >
            Code
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleCenterClick}
          >
            Centrer
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:text-teal-500"
            type="button"
            onClick={handleLinkClick}
          >
            Lien
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleImageClick}
          >
            Image
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleHrClick}
          >
            Séparation
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleYtbClick}
          >
            Youtube
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleListClick}
          >
            Liste
          </button>

          <br />
          <br />
          <textarea
            id="create-post-content"
            class="text-left bg-white text-black border-black border-2 p-2 w-full break-words min-h-[50vh] m-1 rounded-md dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            value={text()}
            onInput={handleInputChange}
          ></textarea>
          <br />
          <br />
          <input
            type="submit"
            value="Créer un nouveau post"
            id="create-post-content"
            class="shadow-indigo-500/50 duration-200 hover:rounded-2xl bg-gradient-to-l text-white from-indigo-500 to-teal-500 p-2 rounded-md max-w-full"
          />
        </form>
      </div>
      <div class="my-5">
        <h2 class="text-center text-3xl">Preview :</h2>
        <div class="p-10" innerHTML={Marked.parse(text())}></div>
      </div>
    </div>
  );
};

export default CreatePost;

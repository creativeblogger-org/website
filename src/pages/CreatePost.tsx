import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component, createSignal, lazy, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import { fetch_posts } from "./Home";

const [posts, setPosts] = createSignal([] as Post[]);
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
    document.getElementById("create-post-content") as HTMLElement
  ).innerText;

  const res = await customFetch(
    "https://api.creativeblogger.org/posts",
    "POST",
    JSON.stringify({
      title: title,
      description: description,
      content: content,
      tags: selectedValue(),
    })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post publié avec succès !");
  fetch_posts();
}

function tesr() {
  const test = (
    document.querySelector('input[name="rate"]:checked') as HTMLInputElement
  ).value;
  console.log(test);
}

async function fetch_users() {
  setIsLoading(true);
  const res = await customFetch("https://api.creativeblogger.org/verif/writer");

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
  onMount(() => {
    fetch_users();
  });
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Create</Title>
      </div>
      <div class="flex justify-center w-full">
        <form
          onsubmit={onPostSubmit}
          class="p-10 rounded-xl text-center w-11/12"
          id="post-form"
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
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2"
            autocomplete="off"
          />
          <br />
          <label class="pb-3" for="description">
            Description du post :{" "}
          </label>
          <input
            type="text"
            name="description"
            id="create-post-description"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2"
            autocomplete="off"
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
              class="mt-px cursor-pointer select-none font-light text-gray-700"
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
              class="mt-px cursor-pointer select-none font-light text-gray-700"
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
              class="mt-px cursor-pointer select-none font-light text-gray-700"
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
              class="mt-px cursor-pointer select-none font-light text-gray-700"
              for="fakeorreal"
            >
              Démystification
            </label>
          </div>
          <br />
          <label for="content">Contenu : </label>
          <br />
          <div
            id="create-post-content"
            class="text-left bg-white text-black border-black border-2 p-2 w-full break-words min-h-[50vh] m-1 rounded-md"
            contentEditable
          ></div>
          <br />
          <br />
          <input
            type="submit"
            value="Créer un nouveau post"
            class="shadow-indigo-500/50 duration-200 hover:rounded-2xl bg-gradient-to-l text-white from-indigo-500 to-teal-500 p-2 rounded-md max-w-full"
          />
        </form>
      </div>
    </MetaProvider>
  );
};

export default CreatePost;

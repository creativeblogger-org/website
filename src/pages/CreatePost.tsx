import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component, createSignal, lazy, onMount } from "solid-js";
import { customFetch, displayError, getError } from "../utils/functions_utils";
import { fetch_posts } from "./Home";

const [posts, setPosts] = createSignal([] as Post[]);
const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);

async function onPostSubmit(e: Event) {
  e.preventDefault();

  const title = (
    document.getElementById("create-post-title") as HTMLInputElement
  ).value;
  const content = (
    document.getElementById("create-post-content") as HTMLElement
  ).innerText;

  const res = await customFetch(
    "https://api.creativeblogger.org/posts",
    "POST",
    JSON.stringify({ title: title, content: content })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  alert("Post publié avec succès !");
  fetch_posts();
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
            required
          />
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

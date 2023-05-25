import {
  Component,
  Show,
  createEffect,
  createSignal
} from "solid-js";
import { customFetch, fetch_posts, getToken, isConnected } from "../utils/functions_utils";

const [showPopup, setShowPopup] = createSignal(false);
const [error, setError] = createSignal("");

async function onPostSubmit(e: Event) {
  e.preventDefault();

  if (isConnected()) {
    alert("Vous ne pouvez pas poster de posts si vous n'êtes pas connecté.");
    return;
  }

  const res = await customFetch(
    "https://api.creativeblogger.org/posts/new",
    "PUT",
    new FormData(document.getElementById("post-form") as HTMLFormElement)
  );

  if (!res.ok) {
    const error: ServerError = await res.json();
    setError(error.errors[0].message);
    return;
  }

  alert("Post publié avec succès !");
  setShowPopup(false);
  fetch_posts();
}

const CreatePostButton: Component = () => {
  window.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      setShowPopup(false)
    }
  });

  createEffect(() => {
    if (showPopup()) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });

  return (
    <>
      <Show when={showPopup()}>
        <div class="text-white fixed p-40 pt-10 top-0 left-0 h-screen z-[2] w-screen">
          <form
            onsubmit={onPostSubmit}
            class=" bg-blue-700 z-[3] relative p-2 rounded-xl text-center"
            id="post-form"
          >
            <button
              class="absolute top-0 left-0 p-2 m-2 font-bold"
              onclick={() => setShowPopup(false)}
            >
              X
            </button>
            <h1 class="text-2xl m-5">Créer un post</h1>
            <label for="title">Titre du post : </label>
            <input
              type="text"
              name="title"
              id="post-title"
              class="text-black p-1"
              required
            />
            <br />
            <label for="content">Contenu : </label>
            <br />
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              class="text-black p-1"
              required
            ></textarea>
            <br />
            <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
            <input
              type="submit"
              value="Créer un nouveau post"
              class="bg-blue-800 border-blue-950 border-2 p-1 rounded-md"
            />
          </form>
        </div>
      </Show>

      <button
        onclick={() => setShowPopup(true)}
        class="bg-teal-500 duration-150 hover:bg-indigo-500 rounded-full border p-4 text-5xl fixed right-0 bottom-0"
      >
        +
      </button>
    </>
  );
};

export default CreatePostButton;

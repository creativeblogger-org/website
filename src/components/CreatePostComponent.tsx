import { Component, Show, createEffect, createSignal } from "solid-js";
import {
  customFetch,
  displayError,
  getError,
  isConnected,
} from "../utils/functions_utils";
import { fetch_posts } from "../pages/Home";

const [showPopup, setShowPopup] = createSignal(false);

async function onPostSubmit(e: Event) {
  e.preventDefault();

  const res = await customFetch(
    "https://api.creativeblogger.org/posts",
    "POST",
    new FormData(document.getElementById("post-form") as HTMLFormElement),
    false
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  alert("Post publié avec succès !");
  setShowPopup(false);
  fetch_posts();
}

const CreatePostComponent: Component = () => {
  window.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      setShowPopup(false);
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
        <div class="fixed p-[20vw] pt-[10vh] pb-[10vh] top-0 left-0 h-full z-[2] w-11/12">
          <form
            onsubmit={onPostSubmit}
            class=" bg-slate-800 text-white z-[3] relative p-10 rounded-xl text-center"
            id="post-form"
          >
            <button
              class="absolute top-0 right-0 p-2 font-bold hover:bg-red-600 rounded-tr-xl"
              onclick={() => setShowPopup(false)}
            >
              x
            </button>
            <h1 class="text-4xl pb-5 text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500">
              Créer un post
            </h1>
            <label class="pb-3" for="title">
              Titre du post :{" "}
            </label>
            <input
              type="text"
              name="title"
              id="post-title"
              class="text-black p-2 w-full m-1 rounded-md"
              autocomplete="off"
              required
            />
            <br />
            <label for="content">Contenu : </label>
            <br />
            <textarea
              name="content"
              id="content"
              class="text-black p-2 w-full h-[25vh] m-1 rounded-md"
              required
            ></textarea>
            <br />
            <br />
            <input
              type="submit"
              value="Créer un nouveau post"
              class="shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 p-2 rounded-md max-w-full"
            />
          </form>
        </div>
      </Show>

      <button
        onclick={() => {
          if (!isConnected()) {
            alert("Vous ne pouvez poster de post que si vous êtes connecté.");
            return;
          }
          setShowPopup(true);
        }}
        class="bg-teal-500 duration-150 hover:bg-indigo-500 rounded-full border p-4 text-5xl fixed right-0 bottom-0"
      >
        +
      </button>
    </>
  );
};

export default CreatePostComponent;

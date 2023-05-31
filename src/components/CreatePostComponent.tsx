import {
  Component,
  Show,
  createEffect,
  createSignal
} from "solid-js";
import { customFetch, displayError, error, getError, isConnected, success } from "../utils/functions_utils";
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
        <div class="fixed p-[20vw] pt-[10vh] pb-[10vh] top-0 left-0 h-screen z-[2] w-screen">
          <form
            onsubmit={onPostSubmit}
            class=" bg-blue-700 z-[3] relative p-4 rounded-xl text-center"
            id="post-form"
          >
            <button
              class="absolute top-0 right-0 p-2 font-bold hover:bg-red-600 rounded-tr-xl"
              onclick={() => setShowPopup(false)}
            >
              x
            </button>
            <h1 class="text-2xl">Créer un post</h1>
            <label for="title">Titre du post : </label>
            <input
              type="text"
              name="title"
              id="post-title"
              class="text-black p-1 w-full"
              required
            />
            <br />
            <label for="content">Contenu : </label>
            <br />
            <textarea
              name="content"
              id="content"
              class="text-black p-1 w-full h-[25vh]"
              required
            ></textarea>
            <br />
            <input
              type="submit"
              value="Créer un nouveau post"
              class="bg-blue-800 border-blue-950 border-2 p-1 rounded-md max-w-full"
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
          setShowPopup(true)
        }}
        class="bg-teal-500 duration-150 hover:bg-indigo-500 rounded-full border p-4 text-5xl fixed right-0 bottom-0"
      >
        +
      </button>
    </>
  );
};

export default CreatePostComponent;

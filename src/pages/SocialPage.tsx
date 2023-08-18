import { Component } from "solid-js";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import MastodonLogo from "../assets/button_icons/mastodon.png";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";

async function mastodonSend(e: Event) {
  e.preventDefault();

  const title = (
    document.getElementById("create-post-title") as HTMLInputElement
  ).value;
  const content = (
    document.getElementById("create-post-content") as HTMLInputElement
  ).value;
  const tags = (document.getElementById("create-post-tags") as HTMLInputElement)
    .value;

  const res = await customFetch(
    "https://api.creativeblogger.org/social/mastodon",
    "POST",
    JSON.stringify({
      title: title,
      content: content,
      tags: tags,
    })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post publié avec succès !");
}

const SocialPage: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Social Page</Title>
        <Meta
          name="description"
          content="Ouuups, vous semblez perdu ! Vous avez recherché une page qui n'existe pas. Retournez en lieu sûr !"
        />
      </div>
      <div>
        <h2 class="mt-4 text-center text-xl md:text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Page "Sociale" du site (admins only)
        </h2>
        <div class="w-full lg:w-1/2 my-10">
          <div class="mt-5 flex items-center">
            <img src={MastodonLogo} alt="Mastodon Logo" class="mx-4 h-16" />
            <h1 class="font-bold text-xl">Envoyer un message sur Mastodon</h1>
          </div>
          <div class="mx-7">
            <label for="title" class="pb-3 mx-5">
              Titre :
            </label>
            <input
              type="text"
              name="title"
              id="create-post-title"
              class="text-black p-2 w-2/3 lg:w-1/3 m-1 h-10 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              autocomplete="off"
              placeholder="Salut c'est Creative Blogger"
            />
            <br />
            <label for="content" class="pb-3 mx-1.5">
              Contenu :
            </label>
            <input
              type="text"
              name="content"
              id="create-post-content"
              class="text-black p-2 w-full lg:w-2/3 m-1 h-20 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              autocomplete="off"
              placeholder="Salut c'est Creative Blogger"
            />
            <br />
            <label for="tags" class="pb-3 mx-1.5">
              Hashtags :
            </label>
            <input
              type="text"
              name="tags"
              id="create-post-tags"
              class="text-black p-2 w-2/3 lg:w-1/3 m-1 h-8 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              autocomplete="off"
              placeholder="#cb => obligatoire"
            />
            <br />
            <button
              onclick={mastodonSend}
              class="shadow-indigo-500/50 mt-7 duration-200 hover:rounded-2xl bg-gradient-to-l text-white from-indigo-500 to-teal-500 p-2 rounded-md max-w-full"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
};

export default SocialPage;

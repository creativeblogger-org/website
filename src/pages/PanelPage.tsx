import { Component, For, createSignal, onMount } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import UsersPreviewComponent from "../components/UsersPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import { fetch_posts } from "./Home";
import { API_URL } from "../App";

const [content, setContent] = createSignal("");
const [color, setColor] = createSignal("");
const [link, setLink] = createSignal("");
const [textLink, setTextLink] = createSignal("");

const [style, setStyle] = createSignal("");

function handleContentChange(event: any) {
  setContent(event.target.value);
}
function handleColorChange(event: any) {
  setColor(event.target.value);
  setStyle(
    `text-center text-white font-bold pt-1 bg-${event.target.value}-500 text-xl`
  );
}
function handleLinkChange(event: any) {
  setLink(event.target.value);
}
function handleTextLinkChange(event: any) {
  setTextLink(event.target.value);
}

async function delete_banner() {
  const res = await customFetch(
    `https://api.creativeblogger.org/panel/delete`,
    "DELETE"
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }
  displaySuccess("Bannière supprimée avec succès !");
}

const [posts, setPosts] = createSignal([] as Post[]);
const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);

async function fetch_users() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/users`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));

    return;
  }

  const users: User[] = await res.json();
  setUsers(users.reverse());
  setIsLoading(false);
}

const PanelPage: Component = () => {
  onMount(() => {
    fetch_posts();
    fetch_users();
  });

  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Home</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div class="p-3 w-full">
        <h1 class="text-center text-4xl">Modifier le bandeau du site :</h1>
        <form
          class="flex justify-center mt-5 mb-10"
          onsubmit={async (e) => {
            e.preventDefault();
            const textContent = (
              document.getElementById("content") as HTMLInputElement
            ).value;
            const colorContent = (
              document.getElementById("color") as HTMLInputElement
            ).value;
            const textLinkContent = (
              document.getElementById("link_text") as HTMLInputElement
            ).value;
            const linkContent = (
              document.getElementById("link") as HTMLInputElement
            ).value;
            console.log(
              textContent,
              colorContent,
              textLinkContent,
              linkContent
            );
            const res = await customFetch(
              `https://api.creativeblogger.org/panel/banner`,
              "POST",
              JSON.stringify({
                content: textContent,
                color: colorContent,
                link_text: textLinkContent,
                link: linkContent,
              })
            );

            if (!res.ok) {
              displayError(getError(await res.json()));
              return;
            }
            displaySuccess("Nouvelle bannière mise en place !");
          }}
        >
          <div>
            <label for="content">Contenu :</label>
            <input
              required
              type="text"
              value={content()}
              oninput={handleContentChange}
              class="border rounded-xl p-1 mx-5 border-black w-2/3 mb-2 dark:bg-slate-800 dark:text-white dark:border-white"
              id="content"
            />
            <br />
            <label for="color">Couleur : (teal, orange, red)</label>
            <input
              required
              value={color()}
              oninput={handleColorChange}
              type="text"
              class="border rounded-xl p-1 mx-5 border-black w-24 mb-2 dark:bg-slate-800 dark:text-white dark:border-white"
              id="color"
            />
            <br />
            <label for="link_text">Texte du lien :</label>
            <input
              required
              value={textLink()}
              onInput={handleTextLinkChange}
              type="text"
              class="border rounded-xl p-1 mx-5 border-black w-1/3 mb-2 dark:bg-slate-800 dark:text-white dark:border-white"
              id="link_text"
            />
            <br />
            <label for="link">Contenu du lien :</label>
            <input
              required
              value={link()}
              onInput={handleLinkChange}
              type="text"
              class="border rounded-xl p-1 mx-5 border-black w-2/3 mb-2 dark:bg-slate-800 dark:text-white dark:border-white"
              id="link"
            />
            <br />
            <button
              class="p-2 bg-teal-500 rounded-2xl duration-150 hover:bg-teal-600"
              type="submit"
            >
              Envoyer
            </button>
            <button
              onclick={delete_banner}
              class="p-2 bg-red-500 rounded-2xl duration-150 hover:bg-red-600 mx-4"
            >
              Supprimer la bannière actuelle
            </button>
            <h2 class={style()}>
              {content()}
              <NavLink href={link()} class="text-indigo-500 mx-2 underline">
                {textLink()}
              </NavLink>
            </h2>
          </div>
        </form>
        <h1 class="text-center text-4xl">Utilisateurs :</h1>
        <div class=" w-11/12 grid grid-cols-1 sm:grid-cols-2 m-auto md:grid-cols-3 xl:grid-cols-4" id="users">
          <For each={users()} fallback={"Aucun utilisateur pour le moment..."}>
            {(user, _) => <UsersPreviewComponent user={user} />}
          </For>
        </div>
      </div>
    </MetaProvider>
  );
};

export default PanelPage;
export { setPosts, fetch_users };

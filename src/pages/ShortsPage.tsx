import { For, Show, createEffect, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  isConnected,
  isNotAcceptShortConditions,
} from "../utils/functions_utils";
import ShortsPreviewComponent from "../components/ShortsPreviewComponent";
import ArrowUpLogo from "../assets/button_icons/arow-up.png";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.png";
import Logo from "../assets/img/short-logo.png";

const [shorts, setShorts] = createSignal([] as Short[]);
const [isLoading, setIsLoading] = createSignal(false);

const [page, setPage] = createSignal(1);

function acceptConditions() {
  document.cookie = "shorts=shorts; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  window.location.reload();
}

async function fetch_shorts() {
  setIsLoading(true);
  const res = await customFetch(
    `https://api.creativeblogger.org/shorts?limit=10&page=${page() - 1}`
  );

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  setShorts(await res.json());
  setIsLoading(false);
}

const [infos, setInfos] = createSignal({} as User);

async function getInfos() {
  const res = await customFetch(`https://api.creativeblogger.org/@me/`, "GET");

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  setInfos(await res.json());
}

async function onPostSubmit(e: Event) {
  e.preventDefault();

  const title = (document.getElementById("short-title") as HTMLInputElement)
    .value;
  const content = (document.getElementById("short-content") as HTMLInputElement)
    .value;

  const res = await customFetch(
    "https://api.creativeblogger.org/shorts",
    "POST",
    JSON.stringify({
      title: title,
      content: content,
    })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Short publié avec succès !");
  fetch_shorts();
}

const ShortsPage = () => {
  onMount(() => {
    if (isConnected() === true) {
      getInfos();
    }
  });
  createEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paramValue = urlParams.get("page");
    setPage(parseInt(paramValue || "") || 1);
    fetch_shorts();
  });
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Short Blog</Title>
        <Meta
          name="description"
          content="Short Blog - Service d'envoie de messages brefs à but informatifs"
        />
      </div>
      <div>
        <div class="px-5 flex justify-end">
          <button
            onclick={fetch_shorts}
            class={`${
              isLoading() ? "animate-spin " : ""
            }rounded-full border-white`}
          >
            <img src={ReloadImg} class="h-8" alt="Reload image" />
          </button>
        </div>

        <Show when={isNotAcceptShortConditions()}>
          <div class="p-4 border rounded-md my-5 mx-7 bg-slate-100">
            <h2 class="mt-4 font-pangolin text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Short Blog, Welcome !
            </h2>
            <p class="mt-2 italic text-center">
              Service d'envoie de messages brefs à but informatifs d'une durée
              de vie de 24h
            </p>
            <p class="mb-4 text-center">
              Veuillez rester cordial dans vos propos. Vous pouvez y exprimer
              vos opinions tout en respectant ceux des autres. <br />
              Nous vous rappelons également que vous seuls êtes responsables de
              ce que vous postez. Vous pourrez modifier ou supprimer vos posts
              qui, dans ce cas, se retrouveront supprimés de la base de données.{" "}
              <br />
              Après 72h d'existence, les shorts sont supprimés en ne laissant
              aucune trace. <br />
              Creative Blogger Org ne peut en aucun cas être tenus responsable
              du contenu posté par ses membres. <br />
              Nous vous rappelons également que, dans un cadre juridique, nous
              enregistrons votre IP lors de l'envoi d'un message.
            </p>
            <img
              src={ArrowUpLogo}
              alt="Arrow Up"
              class="mx-auto hover:cursor-pointer"
              onclick={acceptConditions}
            />
          </div>
        </Show>
        <div
          class="rounded-md border p-5 m-5 w-11/12 h-auto grid grid-cols-1 md:grid-cols-1"
          id="shorts"
        >
          <For each={shorts()} fallback={"Aucun shorts pour le moment..."}>
            {(shorts, _) => (
              <ShortsPreviewComponent shorts={shorts} infos={infos()} />
            )}
          </For>
        </div>
        <div>
          <form action="" onsubmit={onPostSubmit}>
            <input
              type="text"
              name="title"
              id="short-title"
              class="text-black p-2 w-1/8 mb-2 mx-8 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              autocomplete="off"
              placeholder="Titre du short"
            />
            <br />
            <input
              type="text"
              name="content"
              id="short-content"
              class="text-black p-2 mb-2 w-5/6 mx-8 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
              autocomplete="off"
              placeholder="Contenu du short"
            />
            <br />
            <button
              class="p-0 mb-10 px-2 mx-8 border rounded-md duration-150 hover:border-indigo-500"
              type="submit" title="Envoyer le short"
            >
              <img class="h-10" src={Logo} alt="Send shorts" />
            </button>
          </form>
        </div>
      </div>
      <br />
    </MetaProvider>
  );
};

export default ShortsPage;
export { fetch_shorts };

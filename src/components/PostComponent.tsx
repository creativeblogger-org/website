import { For, Show, createEffect, createSignal } from "solid-js";
import { NavLink } from "@solidjs/router";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import EditIcon from "../assets/button_icons/edit.svg";
import CancelEditIcon from "../assets/button_icons/x-circle.svg";
import DeleteIcon from "../assets/button_icons/trash.svg";
import SaveIcon from "../assets/button_icons/save.svg";
import { fetch_post_by_slug } from "../pages/PostPage";
import SendIcon from "../assets/button_icons/send.svg";
import CommentComponent from "./CommentComponent";
import { Marked } from "@ts-stack/markdown";
import { API_URL } from "../App";

const [selectedValue, setSelectedValue] = createSignal("");

function handleRadioChange(event: any) {
  setSelectedValue(event.target.value);
  console.log(selectedValue());
}

const [editing, setEditing] = createSignal(false);

async function delete_post() {
  const res = await customFetch(`${API_URL}${location.pathname}`, "DELETE");

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post supprimé avec succès !");
  location.assign("/");
}

async function update_post() {
  const title = (
    document.getElementById("create-post-title") as HTMLInputElement
  ).value;
  const description = (
    document.getElementById("create-post-description") as HTMLInputElement
  ).value;
  const content = (document.querySelector(".post-content") as HTMLElement)
    .innerText;
  const image = (
    document.getElementById("create-post-image") as HTMLInputElement
  ).value;
  const res = await customFetch(
    `${API_URL}${location.pathname}`,
    "PUT",
    JSON.stringify({
      title: title,
      description: description,
      content: content,
      image: image,
      tags: selectedValue(),
    })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post mis à jour avec succès !");

  setEditing(false);

  fetch_post_by_slug();
}

async function post_comment(url: string, content: string) {
  const res = await customFetch(
    url,
    "POST",
    JSON.stringify({ content: content })
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Commentaire posté avec succès !");
  (document.getElementById("comment-content") as HTMLInputElement).value = "";

  fetch_post_by_slug();
}

const PostComponent = (props: {
  post: PostWithoutComments;
  comments: Comment[];
}) => {
  const [editIcon, setEditIcon] = createSignal(EditIcon);

  createEffect(() => {
    if (!editing()) {
      setEditIcon(EditIcon);
    } else {
      setEditIcon(CancelEditIcon);
    }
  });

  function imgLink() {
    location.assign("/users/" + props.post.author.username);
  }
  return (
    <div class="flex">
      <div class="sm:p-4 m-1 sm:m-5 relative">
        <h1 class="text-4xl font-bold text-center font-pangolin">
          {props.post.title}
        </h1>
        <Show when={props.post.has_permission}>
          <div class="absolute top-0 right-0 p-2 flex gap-2 invisible sm:visible">
            <button onclick={() => setEditing((edit) => !edit)}>
              <img src={editIcon()} alt="Edit icon" />
            </button>
            <button onclick={() => delete_post()}>
              <img
                src={DeleteIcon}
                alt="Delete icon"
                width={24}
                height={24}
              ></img>
            </button>
          </div>
        </Show>
        <div class="flex justify-center m-2 items-center">
          <img
            src={props.post.author.pp}
            class="h-7 mx-1 hover:cursor-pointer"
            onclick={imgLink}
            alt=""
          />
          <NavLink
            href={"/users/" + props.post.author.username}
            class="font-bold text-teal-500 text-xl duration-150 font-garamond hover:text-indigo-800 hover:underline"
          >
            @{props.post.author.username}
          </NavLink>
        </div>
        <div class="flex justify-center">
          <span>Créé le {getHumanDate(props.post.created_at)}</span>
        </div>
        <div class="flex justify-center mb-4">
          <Show when={props.post.created_at != props.post.updated_at}>
            <span>Mis à jour le {getHumanDate(props.post.updated_at)}</span>
          </Show>
        </div>
        <hr />
        <Show when={editing()}>
          <label class="pb-3" for="title">
            Titre du post :
          </label>
          <input
            type="text"
            name="title"
            id="create-post-title"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
            value={props.post.title}
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
            value={props.post.image}
          />
          <br />
          <label class="pb-3" for="description">
            Description du post :{" "}
          </label>
          <input
            type="text"
            name="description"
            value={props.post.description}
            id="create-post-description"
            class="text-black p-2 w-full m-1 rounded-md border-black border-spacing-3 border-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100"
            autocomplete="off"
          />
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
          </div>
        </Show>
        <div
          class="post-content text-lg md:text-xl break-words text-justify w-full md:w-2/3 border rounded-md sm:p-8 m-3 mx-auto"
          contentEditable={editing()}
          innerHTML={
            !editing() ? Marked.parse(props.post.content) : props.post.content
          }
        ></div>
        <Show when={editing()}>
          <div class="text-center">
            <button onclick={() => update_post()}>
              <img src={SaveIcon} alt="Save icon" width={24} height={24} />
            </button>
          </div>
        </Show>
        <div class="m-auto w-full md:w-2/3">
          <h1 class="text-xl mt-8 font-bold">Commentaires</h1>
          <form
            class="flex items-center"
            onsubmit={(e) => {
              e.preventDefault();

              post_comment(
                `${API_URL}/posts/${props.post.slug}/comment`,
                (document.getElementById("comment-content") as HTMLInputElement)
                  .value
              );
            }}
          >
            <input
              type="text"
              name="comment-content"
              id="comment-content"
              class="rounded-md p-2 m-2 w-2/3 sm:w-1/3 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:placeholder:opacity-100 border"
              placeholder="Ajoutez un commentaire..."
            />
            <button type="submit">
              <img src={SendIcon} alt="Send icon" />
            </button>
          </form>
          <For
            each={props.comments}
            fallback={"Aucun commentaire pour le moment..."}
          >
            {(comment, _) => <CommentComponent comment={comment} />}
          </For>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

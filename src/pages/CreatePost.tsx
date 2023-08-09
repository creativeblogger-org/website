import { MetaProvider, Title } from "@solidjs/meta";
import { Component, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import { fetch_posts } from "./Home";
import { Marked } from "@ts-stack/markdown";

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

  const res = await customFetch(
    "https://api.creativeblogger.org/posts",
    "POST",
    JSON.stringify({
      title: title,
      description: description,
      content: content,
      tags: selectedValue(),
      image: image,
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

function convertToMarkdown(text: any) {
  return (
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /`(.+?)`/g,
        "<p class='bg-slate-800 p-4 m-5 rounded-md text-white'>$1</p>"
      )
      .replace(/!\[(.*?)\]\((.*?)\)/g, "<img alt='$1' src='$2'>")
      .replace(/\---/g, "<hr />")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, "<br />")
      // .replace(/\$\$(.*?)\$\$/g, '<span class="text-teal-500">$1</span>')
      // .replace(/\$(.*?)\$/g, '<span class="text-indigo-500">$1</span>')
      .replace(/\$red\$(.*?)\$red\$/g, '<span style="color: red;">$1</span>')
      .replace(/\$blue\$(.*?)\$blue\$/g, '<span style="color: blue;">$1</span>')
      .replace(
        /\$green\$(.*?)\$green\$/g,
        '<span style="color: green;">$1</span>'
      )
      .replace(/\^(.+?)\^/g, "<div>$1</div>")
      .replace(
        /\&(.*?)\&(.*?)\&(.*?)&/g,
        "<div class='grid grid-cols-$1'>$2</div>"
      )
      .replace(/^- (.*)$/gm, "<ul class='list-disc'><li>$1</li></ul>")
      .replace(/^# (.*)$/gm, "<h1 class='text-6xl'>$1</h1>")
      .replace(/^## (.*)$/gm, "<h2 class='text-5xl'>$1</h2>")
      .replace(/^### (.*)$/gm, "<h3 class='text-4xl'>$1</h3>")
      .replace(/^#### (.*)$/gm, "<h4 class='text-3xl'>$1</h4>")
      .replace(/^##### (.*)$/gm, "<h5 class='text-2xl'>$1</h5>")
      .replace(/^###### (.*)$/gm, "<h6 class='text-xl'>$1</h6>")
      .replace(/\|(.*?)\|/g, "<div class='flex justify-center'>$1</div>")
      .replace(
        /\[!\[\]\((.*?)\)\]\((.*?)\)/g,
        '<div><a href="$2"><img src="$1" alt="YouTube Video"></a></div><div>YouTube Video: <a href="$2">$2</a></div>'
      )
  );
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
    wrapSelection("\n---");
  }

  function handleYtbClick() {
    wrapSelection(
      "[![](https://markdown-videos.vercel.app/youtube/VIDEO_ID)](https://www.youtube.com/watch?v=VIDEO_ID)"
    );
  }

  function handleGridClick() {
    wrapSelection("&2&^Hello^^Hello 2^&2&");
  }

  function handleListClick() {
    wrapSelection("- ");
  }

  function handleColorButtonClick(color: string) {
    wrapTextSelection(`$${color}$`);
  }

  function handleTextClick() {
    wrapSelection("# Ajoutez des '#' si vous voulez le texte en plus petit");
  }

  function handleCenterClick() {
    wrapTextSelection("|");
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
            placeholder="https://image.creativeblogger.org/images/..."
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
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleGridClick}
          >
            Colonne
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500"
            type="button"
            onClick={handleTextClick}
          >
            Text
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:text-red-500"
            type="button"
            onClick={() => handleColorButtonClick("red")}
          >
            Red
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:text-blue-500"
            type="button"
            onClick={() => handleColorButtonClick("blue")}
          >
            Blue
          </button>
          <button
            class="px-2 my-2 border rounded-md py-2 mx-3 duration-150 hover:border-indigo-500 hover:text-green-500"
            type="button"
            onClick={() => handleColorButtonClick("green")}
          >
            Green
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
    </MetaProvider>
  );
};

export default CreatePost;

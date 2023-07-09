import { For, Show, createEffect, createSignal, onMount } from "solid-js";
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
import PostPreviewComponent from "./PostPreviewComponent";

function convertMarkdownToHtml(markdown: string): string {
  if (markdown !== undefined && markdown !== null) {
    return (
      markdown
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
        .replace(
          /\$blue\$(.*?)\$blue\$/g,
          '<span style="color: blue;">$1</span>'
        )
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
}

const [editing, setEditing] = createSignal(false);

async function delete_post() {
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`,
    "DELETE"
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Post supprimé avec succès !");
  location.assign("/");
}

async function update_post(post: RudimentaryPost, new_content: string) {
  post.content = new_content;
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`,
    "PUT",
    JSON.stringify(post)
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

  onMount(() => {
    console.log(convertMarkdownToHtml(props.post.content));
  });

  return (
    <div>
      <div class="p-4 m-5 relative">
        <h1 class="text-4xl font-bold text-center">{props.post.title}</h1>
        <Show when={props.post.has_permission}>
          <div class="absolute top-0 right-0 p-2 flex gap-2">
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
        <div class="flex justify-center m-2">
          <NavLink
            href={"/users/" + props.post.author.username}
            class="font-bold duration-150 hover:text-indigo-800 hover:underline"
          >
            @{props.post.author.username}
          </NavLink>
        </div>
        <div class="flex justify-center">
          <span>Créé le {getHumanDate(props.post.created_at)}</span>
        </div>
        <div class="flex justify-center mb-5">
          <Show when={props.post.created_at != props.post.updated_at}>
            <span>Mis à jour le {getHumanDate(props.post.updated_at)}</span>
          </Show>
        </div>
        <hr />
        <div
          class="post-content text-lg md:text-xl break-words w-full md:w-2/3 border rounded-md p-8 mx-auto m-3"
          contentEditable={editing()}
          innerHTML={
            !editing()
              ? convertMarkdownToHtml(props.post.content)
              : props.post.content
          }
        ></div>
        <Show when={editing()}>
          <div class="text-center">
            <button
              onclick={() =>
                update_post(
                  props.post,
                  (document.querySelector(".post-content") as HTMLElement)
                    .innerText
                )
              }
            >
              <img src={SaveIcon} alt="Save icon" width={24} height={24} />
            </button>
          </div>
        </Show>
        <div class="m-auto w-5/6">
          {/* Way to get number of posts will be modified in the v2 of the API */}
          <h1 class="text-xl mt-8 font-bold">
            Commentaires ({props.comments.length})
          </h1>
          <form
            onsubmit={(e) => {
              e.preventDefault();

              post_comment(
                `https://api.creativeblogger.org/posts/${props.post.slug}/comment`,
                (document.getElementById("comment-content") as HTMLInputElement)
                  .value
              );
            }}
          >
            <input
              type="text"
              name="comment-content"
              id="comment-content"
              class="rounded-md p-2 m-2 w-1/3"
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

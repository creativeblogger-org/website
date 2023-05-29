import { For, Show, createEffect, createSignal } from "solid-js";
import { NavLink } from "@solidjs/router";
import { customFetch, getError, getHumanDate } from "../utils/functions_utils";
import EditIcon from "../assets/button_icons/edit.svg";
import CancelEditIcon from "../assets/button_icons/x-circle.svg";
import DeleteIcon from "../assets/button_icons/trash.svg";
import SaveIcon from "../assets/button_icons/save.svg";
import { fetch_post_by_slug } from "../pages/PostPage";
import SendIcon from "../assets/button_icons/send.svg";
import CommentComponent from "./CommentComponent";

const [error, setError] = createSignal("");

const [editing, setEditing] = createSignal(false);

async function delete_post() {
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`,
    "DELETE"
  );

  if (!res.ok) {
    setError(getError(await res.json()));
    return;
  }

  alert("Post supprimé avec succès !");
  location.assign("/");
}

async function update_post(post: RudimentaryPost, new_content: string) {
  post.content = new_content;
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`,
    "PUT",
    JSON.stringify(post)
  );
  
  if (res.status == 404) {
    alert("Erreur 404");
  }

  if (!res.ok) {
    setError(getError(await res.json()));
    return;
  }

  alert("Success !");

  setEditing(false);

  fetch_post_by_slug();
}

async function post_comment(url: string, content: string) {
  const res = await customFetch(url, "POST", JSON.stringify({content: content}));

  if (!res.ok) {
    alert(getError(await res.json()))
    return
  }

  alert("Commentaire créé avec succès !")

  fetch_post_by_slug()
}

const PostComponent = (props: {post: PostWithoutComments, comments: Comment[]}) => {
  const [editIcon, setEditIcon] = createSignal(EditIcon);

  createEffect(() => {
    if (!editing()) {
      setEditIcon(EditIcon);
      (document.querySelector(".post-content") as HTMLTextAreaElement).value = props.post.content
    } else {
      setEditIcon(CancelEditIcon);
    }
  });

  return (
    <div>
      <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
      <div class="p-4 m-5 relative">
        <h1 class="text-4xl font-bold text-center">{props.post.title}</h1>
        <Show when={props.post.has_permission}>
          <div class="absolute top-0 right-0">
            <button onclick={() => setEditing((edit) => !edit)}>
              <img src={editIcon()} alt="Edit icon" />
            </button>
            <button class="m-2 p-2z-[1]" onclick={() => delete_post()}>
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
            href={"/user/" + props.post.author.username}
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
        <div class="mt-5 w-11/12 max-h-[75vh] m-auto mb-3">
          <textarea
            name="post-content"
            readOnly={!editing()}
            class="post-content resize-none max-h-screen h-[50vh] w-full p-2"
          >
            {props.post.content}
          </textarea>
        </div>
        <Show when={editing()}>
          <div class="text-center">
            <button
              onclick={() =>
                update_post(
                  props.post,
                  (document.querySelector(".post-content") as HTMLTextAreaElement)
                    .value
                )
              }
            >
              <img src={SaveIcon} alt="Save icon" width={24} height={24} />
            </button>
          </div>
        </Show>
        <div class="m-auto w-5/6">
          {/* Way to get number of posts will be modified in the v2 of the API */}
          <h1 class="text-xl font-bold">Commentaires ({props.comments.length})</h1>
          <form onsubmit={e => {
            e.preventDefault()

            post_comment(`https://api.creativeblogger.org/posts/${props.post.slug}/comment`, (document.getElementById("content") as HTMLInputElement).value)
          }}>
            <input type="text" name="content" id="content" placeholder="Ajoutez un commentaire..." />
            <button type="submit"><img src={SendIcon} alt="Send icon" /></button>
          </form>
          <For
            each={props.comments}
            fallback={"Aucun commentaire pour le moment..."}
          >
            {(comment, _) => (
              <CommentComponent comment={comment} />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

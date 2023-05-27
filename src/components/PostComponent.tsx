import { For, Show, createEffect, createSignal } from "solid-js";
import { NavLink } from "@solidjs/router";
import { customFetch, getError, getHumanDate } from "../utils/functions_utils";
import EditIcon from "../assets/button_icons/edit.svg";
import CancelEditIcon from "../assets/button_icons/x-circle.svg";
import DeleteIcon from "../assets/button_icons/trash.svg";
import SaveIcon from "../assets/button_icons/save.svg";

const [post, setPost] = createSignal({
  author: {},
  id: 0,
} as Post);

const [comments, setComments] = createSignal([] as Comment[]);

const [error, setError] = createSignal("");

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

async function update_post(post: Post, new_content: string) {
  post.content = new_content;
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`,
    "PATCH",
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
}

const PostComponent = () => {
  const [editing, setEditing] = createSignal(false);
  const [editIcon, setEditIcon] = createSignal(EditIcon);

  createEffect(() => {
    if (!editing()) {
      setEditIcon(EditIcon);
    } else {
      setEditIcon(CancelEditIcon);
    }
  });

  return (
    <div>
      <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
      <div class="p-4 m-5 relative">
        <h1 class="text-4xl font-bold text-center">{post().title}</h1>
        <Show when={post().has_permission}>
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
            href={"/user/" + post().author.username}
            class="font-bold duration-150 hover:text-indigo-800 hover:underline"
          >
            @{post().author.username}
          </NavLink>
        </div>
        <div class="flex justify-center">
          <span>Créé le {getHumanDate(post().created_at)}</span>
        </div>
        <div class="flex justify-center mb-5">
          <Show when={post().created_at != post().updated_at}>
            <span>Mis à jour le {getHumanDate(post().updated_at)}</span>
          </Show>
        </div>
        <hr />
        <div class="mt-5 w-11/12 max-h-[75vh] m-auto mb-3">
          <textarea
            name="post-content"
            readOnly={!editing()}
            class="post-content resize-none max-h-screen h-[50vh] w-full p-2"
          >
            {post().content}
          </textarea>
        </div>
        <Show when={editing()}>
          <div class="text-center">
            <button
              onclick={() =>
                update_post(
                  post(),
                  (document.querySelector(".post-content") as HTMLElement)
                    .textContent!
                )
              }
            >
              <img src={SaveIcon} alt="Save icon" width={24} height={24} />
            </button>
          </div>
        </Show>
        <div class="m-auto w-5/6">
          <h1 class="text-xl font-bold">Commentaires :</h1>
          <For
            each={comments()}
            fallback={"Aucun commentaire pour le moment..."}
          >
            {(comment, i) => (
              <div class="p-2 rounded-lg border mt-5">
                <NavLink
                  href={"/user/" + comment.author.username}
                  class="font-bold duration-150 hover:text-indigo-800"
                >
                  @{comment.author.username}
                </NavLink>{" "}
                <span>
                  a posté ce commentaire le {getHumanDate(comment.created_at)}.{" "}
                </span>
                <Show when={comment.created_at != comment.updated_at}>
                  <span>Modifié le {getHumanDate(comment.updated_at)}</span>
                </Show>
                <p class=" p-4">{comment.content}</p>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
export { post, setPost };

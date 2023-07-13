import { NavLink } from "@solidjs/router";
import { Show, createEffect, createSignal } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { fetch_post_by_slug } from "../pages/PostPage";
import EditIcon from "../assets/button_icons/edit.svg";
import CancelEditIcon from "../assets/button_icons/x-circle.svg";
import DeleteIcon from "../assets/button_icons/trash.svg";
import SaveIcon from "../assets/button_icons/save.svg";

async function update_comment(
  comment: RudimentaryComment,
  new_content: string
) {
  comment.content = new_content;
  const res = await customFetch(
    `https://api.creativeblogger.org/comments/${comment.id}`,
    "PUT",
    JSON.stringify(comment)
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Commentaire mis à jour avec succès !");
  fetch_post_by_slug();
}

async function delete_comment(id: number) {
  const res = await customFetch(
    `https://api.creativeblogger.org/comments/${id}`,
    "DELETE"
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Commentaire supprimé avec succès !");
  fetch_post_by_slug();
}

function CommentComponent(props: { comment: Comment }) {
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
    <div class="p-2 rounded-lg border mt-5 relative">
      <NavLink
        href={"/users/" + props.comment.author.username}
        class="font-garamond text-xl duration-150 hover:text-indigo-800"
      >
        @{props.comment.author.username}
      </NavLink>{" "}
      <span>
        a posté ce commentaire le {getHumanDate(props.comment.created_at)}.{" "}
      </span>
      <Show when={props.comment.created_at != props.comment.updated_at}>
        <span>Modifié le {getHumanDate(props.comment.updated_at)}</span>
      </Show>
      <Show when={props.comment.has_permission}>
        <div class="absolute top-0 right-0">
          <button class="m-1" onclick={() => setEditing((edit) => !edit)}>
            <img src={editIcon()} alt="Edit icon" />
          </button>
          <button class="m-1" onclick={() => delete_comment(props.comment.id)}>
            <img
              src={DeleteIcon}
              alt="Delete icon"
              width={24}
              height={24}
            ></img>
          </button>
        </div>
      </Show>
      <Show
        when={!editing()}
        fallback={
          <>
            <textarea
              readOnly={!editing()}
              class="comment-content max-h-screen w-full p-2 text-lg"
            >
              {props.comment.content}
            </textarea>
            <button
              onclick={() =>
                update_comment(
                  props.comment,
                  (
                    document.querySelector(
                      ".comment-content"
                    ) as HTMLTextAreaElement
                  ).value
                )
              }
            >
              <img src={SaveIcon} alt="Save icon" width={24} height={24} />
            </button>
          </>
        }
      >
        <h2 class="text-lg w-full break-all p-2">{props.comment.content}</h2>
      </Show>
    </div>
  );
}

export default CommentComponent;

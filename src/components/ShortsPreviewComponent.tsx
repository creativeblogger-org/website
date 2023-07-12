import { NavLink } from "@solidjs/router";
import { Show, createEffect, createSignal, onMount } from "solid-js";
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
import { fetch_shorts } from "../pages/ShortsPage";
import { infos } from "./NavBar";

async function update_comment(short: RudimentaryComment, new_content: string) {
  short.content = new_content;
  const res = await customFetch(
    `https://api.creativeblogger.org/shorts/${short.id}`,
    "PUT",
    JSON.stringify(short)
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Short mis à jour avec succès !");
  fetch_shorts();
}

async function delete_comment(id: number) {
  const res = await customFetch(
    `https://api.creativeblogger.org/shorts/${id}`,
    "DELETE"
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Short supprimé avec succès !");
  fetch_shorts();
}

const ShortsPreviewComponent = (props: { shorts: Shorts; infos: User }) => {
  const [editing, setEditing] = createSignal(false);
  const [editIcon, setEditIcon] = createSignal(EditIcon);

  onMount(() => {});

  createEffect(() => {
    if (!editing()) {
      setEditIcon(EditIcon);
    } else {
      setEditIcon(CancelEditIcon);
    }
  });
  return (
    <div>
      <div class="p-2 relative w-full md:w-1/2 xl:w-1/3">
        <NavLink
          href={"/users/" + props.shorts.author.username}
          class="font-bold duration-150 hover:text-indigo-800"
        >
          @{props.shorts.author.username}
        </NavLink>{" "}
        <span>| {getHumanDate(props.shorts.created_at)}. </span>
        <Show when={props.shorts.created_at != props.shorts.updated_at}>
          <span>Modifié le {getHumanDate(props.shorts.updated_at)}</span>
        </Show>
        <Show when={props.shorts.has_permission}>
          <div class="absolute top-0 right-0">
            <button class="m-1" onclick={() => setEditing((edit) => !edit)}>
              <img src={editIcon()} alt="Edit icon" />
            </button>
            <button class="m-1" onclick={() => delete_comment(props.shorts.id)}>
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
                {props.shorts.content}
              </textarea>
              <button
                onclick={() =>
                  update_comment(
                    props.shorts,
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
          <h1 class="text-xl pt-2 font-bold">{props.shorts.title}</h1>
          <h2 class="text-lg w-full break-all p-2">{props.shorts.content}</h2>
          <hr class="p-1 m-1" />
        </Show>
      </div>
    </div>
  );
};

export default ShortsPreviewComponent;

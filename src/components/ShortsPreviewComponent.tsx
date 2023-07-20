import { NavLink } from "@solidjs/router";
import { Show, createEffect, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
} from "../utils/functions_utils";
import EditIcon from "../assets/button_icons/edit.svg";
import CancelEditIcon from "../assets/button_icons/x-circle.svg";
import DeleteIcon from "../assets/button_icons/trash.svg";
import SaveIcon from "../assets/button_icons/save.svg";
import { fetch_shorts } from "../pages/ShortsPage";
import { convertMarkdownToHtml } from "./PostComponent";
import AdminLogo from "../assets/button_icons/admin.png";

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
  location.reload();
}

const ShortsPreviewComponent = (props: { shorts: Short; infos: User }) => {
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
        <h1>
          <NavLink
            href={"/users/" + props.shorts.author.username}
            class="font-garamond text-xl duration-150 hover:text-indigo-800"
          >
            @{props.shorts.author.username}
          </NavLink>{" "}
          à dit <span class="font-bold text-2xl">{props.shorts.title}</span>
        </h1>
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
          <h2
            innerHTML={convertMarkdownToHtml(props.shorts.content)}
            class="text-lg w-full break-all p-2 pt-4"
          ></h2>
          <hr class="p-1 m-1" />
        </Show>
      </div>
    </div>
  );
};

export default ShortsPreviewComponent;

import { For, Show } from "solid-js";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { getToken } from "./CreatePostButton";
import { post } from "../pages/PostPage";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

async function delete_post(post_id: number) {
  const res = await fetch(`https://api.creativeblogger.org/posts/${post_id}`, {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${getToken()}`
      }
  })
  

  if (!res.ok) {
    const error: ServerError = await res.json()
    alert(error.errors[0].message)
    return
  }

  alert("Post supprimé avec succès !")
  location.assign("/")
}

const PostComponent = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>{post().title}</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div class="p-4 m-5">
        <h1 class="text-4xl font-bold text-center">{post().title}</h1>
        <Show when={post().has_permission}>
          <button class="absolute top-0 right-0 text-red-600 font-bold m-2 p-2 border-2 border-red-700 rounded-lg z-[1]" onclick={() => delete_post(post().id)}>Delete</button>
        </Show>
        <div class="flex justify-center m-2">
          <NavLink
            href={"/user/" + post().author.username}
            class="font-bold duration-150 hover:text-indigo-800"
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
        <div class="mt-5 w-11/12 m-auto mb-10">
          <h2>{post().content}</h2>
        </div>
        <div class="m-auto w-5/6">
          <h1 class="text-xl font-bold">Commentaires :</h1>
          <For
            each={post().comments}
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
    </MetaProvider>
  );
};

export default PostComponent;

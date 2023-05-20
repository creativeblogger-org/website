import { For, Show, lazy } from "solid-js";
import { Post } from "../Pages/Home";
import { NavLink } from "@solidjs/router";
import { post } from "../Pages/PostPage";
import { MetaProvider, Title, Meta } from "@solidjs/meta";

const NavBar = lazy(() => import("./NavBar"));
const Footer = lazy(() => import("./Footer"));

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

interface Props {
  post: Post;
}

const PostPageComponent = (props: Props) => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>{props.post.title}</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <NavBar />
      <div class="p-4 m-5">
        <h1 class="text-4xl font-bold text-center">{props.post.title}</h1>
        <div class="flex justify-center m-2">
          <NavLink
            href={"/user/" + props.post.author.username}
            class="font-bold duration-150 hover:text-indigo-800"
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
        <div class="mt-5 w-11/12 m-auto mb-10">
          <h2>{props.post.content}</h2>
        </div>
        <div class="m-auto w-5/6">
          <h1 class="text-xl font-bold">Commentaires :</h1>
          <For
            each={props.post.comments}
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
      <Footer />
    </MetaProvider>
  );
};

export default PostPageComponent;

import { Show } from "solid-js";
import { Post } from "../pages/Home";
import { NavLink } from "@solidjs/router";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

interface Props {
  post: Post;
}

const PostComponent = (props: Props) => {
  return (
    <div class="rounded-lg p-4 m-5 border duration-150 hover:border-indigo-500">
      <h1 class="text-2xl font-bold text-center duration-150 hover:text-indigo-500">
        {props.post.title}
      </h1>
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
      <div class="flex justify-center">
        <Show when={props.post.created_at != props.post.updated_at}>
          <span>Mis à jour le {getHumanDate(props.post.updated_at)}</span>
        </Show>
      </div>
    </div>
  );
};

export default PostComponent;

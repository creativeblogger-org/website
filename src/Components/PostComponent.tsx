import { For, Show } from "solid-js";
import { Post } from "../Pages/Home";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

interface Props {
  post: Post;
}

const PostComponent = (props: Props) => {
  return (
    <div class="rounded-md border m-3">
      <div class="block px-4 py-2 font-semibold rounded-full bg-white">
        <h1 class="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-300 to-teal-800 pb-2">
          {props.post.title}
        </h1>
        <div class="flex justify-center pb-2">
          <a
            href={"/user/" + props.post.author.username}
            class="font-bold text-slate-800"
          >
            @{props.post.author.username}
          </a>
        </div>
        <div class="flex justify-center">
          <span class="text-slate-600">
            Créé le {getHumanDate(props.post.created_at)}
          </span>
          <br />
        </div>
        <div class="flex justify-center pb-3">
          <Show when={props.post.created_at != props.post.updated_at}>
            <span class="text-slate-600">
              Mis à jour le {getHumanDate(props.post.updated_at)}
            </span>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

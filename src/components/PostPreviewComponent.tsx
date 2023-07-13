import { Show } from "solid-js";
import { NavLink } from "@solidjs/router";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

const date = new Date().getDay();

const PostPreviewComponent = (props: { post: Post }) => {
  const style = `background-image: url('${props.post.image}');`;
  return (
    <div
      class="rounded-md m-5 border w-auto duration-150 hover:border-indigo-500"
      style={style}
    >
      <div
        class="h-full w-full overflow-hidden bg-fixed p-4 m-0 rounded-md"
        style="background-color: rgba(0, 0, 0, 0.4)"
      >
        <h1 class="text-xl font-bold font-garamond text-center duration-150 text-white hover:text-indigo-500 md:text-4xl title-post">
          {props.post.title}
        </h1>
        <div class="flex justify-center m-2">
          <NavLink
            href={"/users/" + props.post.author.username}
            class="font-bold text-xl font-garamond duration-150 text-white hover:text-indigo-800"
          >
            @{props.post.author.username}
          </NavLink>
        </div>
        <div class="flex justify-center text-white">
          <span class="text-sm">
            Créé le {getHumanDate(props.post.created_at)}
          </span>
        </div>
        <div class="flex justify-center text-white">
          <Show when={props.post.created_at != props.post.updated_at}>
            <span class="text-sm">
              Mis à jour le {getHumanDate(props.post.updated_at)}
            </span>
          </Show>
        </div>
        <div class="flex justify-center text-white">
          <h2 class="text-center pt-2 text-xl">{props.post.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewComponent;

import { Show, createSignal, onMount } from "solid-js";
import { NavLink } from "@solidjs/router";

function getHumanDate(date: string) {
  const parsed_date = new Date(Date.parse(date));

  return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

const date = new Date().getDay();

const PostPreviewComponent = (props: { post: Post }) => {
  const [description, setDescription] = createSignal("");
  const style = `background-image: url('${props.post.image}'); height: 104px; width: 104px;`;

  function ifDescTooLong(desc: string) {
    if (desc !== undefined && desc !== null) {
      if (desc.length > 40) {
        setDescription(desc.substring(0, 35) + "...");
      } else {
        setDescription(desc);
      }
    }
  }

  onMount(() => {
    ifDescTooLong(props.post.description);
  });

  return (
    <div class="rounded-md m-5 border border-slate-800 dark:border-white w-auto duration-150 hover:border-indigo-500">
      <div class=" h-40 w-full flex items-center bg-fixed p-4 rounded-md">
        <div class="p-2 rounded-md" style={style}></div>
        <div class="text-black w-3/5">
          <h1 class="">
            <p class="text-xl sm:text-2xl w-full dark:text-white font-bold font-garamond mx-4 duration-150 hover:text-indigo-500">
              {props.post.title}
            </p>
            <hr class="px-2 py-0 my-0 md:my-1 xl:my-2 mx-4 border-indigo-500 rounded-md" />
            <p class="text-lg w-full px-2 mx-4 dark:text-white">
              {getHumanDate(props.post.created_at)}
            </p>
          </h1>
        </div>
        <div class="">
          <p class="text-base mx-4 duration-150 md:inline-flex hidden md:visible text-black dark:text-white md:text-lg">
            {description()}
          </p>
          <hr class="px-2 mx-4 my-1 rounded-md border-teal-500 hidden md:inline-flex md:visible md:w-2/3" />
          <p class="px-2 mx-4 text-black dark:text-white text-base hidden md:inline-flex md:visible items-center">
            Auteur :
            <a
              href={"/users/" + props.post.author.username}
              class="font-bold text-base font-garamond duration-150 text-teal-500 hover:text-indigo-800 mx-1"
            >
              {" "}
              @{props.post.author.username}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewComponent;

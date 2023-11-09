import { Component } from "solid-js";
import gifRiccardo from "../assets/gif/gif-riccardo.gif";
import gifMael from "../assets/gif/gif-mael.gif";

const AboutPage: Component = () => {
  return (
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-2 m-6">
        <div class="m-3">
          <img
            src={gifRiccardo}
            class="mx-auto"
            alt="Image GIF de l'avatar de riccardo"
          />
          <h2 class="text-5xl text-teal-500 text-center">Riccardo</h2>
          <h3 class="text-2xl text-indigo-500 text-center">Co-fondateur</h3>
          <hr />
          <p class="text-center">
            S'occupe de la liaison entre le front et l'API, adore le langage V
            et Rust, plutôt de nature calme, il est le pilier qui maintient CB
            en place ☮️
          </p>
          <p class="text-center my-3 text-2xl">Les réseaux de Riccardo</p>
          <div class="grid grid-cols-2 place-items-center">
            <a
              class="text-teal-500 underline text-xl duration-150 hover:text-indigo-500"
              href="https://bsky.app/profile/riccardoroux.bsky.social"
              target="_blank"
            >
              BlueSky
            </a>
            <a
              class="text-teal-500 underline duration-150 text-xl mx-0 hover:text-indigo-500"
              href="https://twitter.com/riccardorouxdev"
              target="_blank"
            >
              Twitter
            </a>
          </div>
        </div>
        <div class="m-3">
          <img
            src={gifMael}
            class="mx-auto"
            alt="Image GIF de l'avatar de SquareDot 3301"
          />
          <h2 class="text-3xl md:text-5xl text-teal-500 text-center">
            SquareDot 3301
          </h2>
          <h3 class="text-2xl text-indigo-500 text-center">Fondateur</h3>
          <hr />
          <p class="text-center">
            Et voici l'être adulé par tout le monde ! SquareDot 3️⃣3️⃣0️⃣1️⃣ ou
            aussi appelé par le nom point carré venant de mon pseudo " .² " 💯
          </p>
          <p class="text-center my-3 text-2xl">Les réseaux de SquareDot 3301</p>
          <div class="grid grid-cols-3 place-items-center">
            <a
              class="text-teal-500 underline text-xl duration-150 mx-0 hover:text-indigo-500"
              href="https://bsky.app/profile/squaredot.bsky.social"
              target="_blank"
            >
              BlueSky
            </a>
            <a
              class="text-teal-500 underline text-xl duration-150 mx-0 hover:text-indigo-500"
              href="https://piaille.fr/@squaredot"
              target="_blank"
            >
              Mastodon
            </a>
            <a
              class="text-teal-500 underline duration-150 text-xl mx-0 hover:text-indigo-500"
              href="https://twitter.com/squaredotcb"
              target="_blank"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h1 class="text-center text-5xl text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500">
          Et voilà la fine équipe !{" "}
        </h1>
      </div>
      <a
        href="/become"
        class="flex mx-auto mt-7 mb-7 w-1/3 sm:w-1/2 md:w-1/6  duration-200 hover:rounded-2xl justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Nous rejoindre !
      </a>
    </div>
  );
};

export default AboutPage;

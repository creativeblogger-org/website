import { Component } from "solid-js";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import gifRiccardo from "../assets/gif/gif-riccardo.gif";
import gifMael from "../assets/gif/gif-mael.gif";
import { NavLink } from "@solidjs/router";

const AboutPage: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - About</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 m-6">
        <div class="m-3">
          <img
            src={gifRiccardo}
            class="mx-auto"
            alt="Image GIF de l'avatar de riccardo"
          />
          <h2 class="text-5xl text-teal-500 text-center">Riccardo</h2>
          <h3 class="text-2xl text-indigo-500 text-center">
            Développeur back-end
          </h3>
          <hr />
          <p class="text-center">
            S'occupe de la liaison entre le front et l'API, adore le langage V
            et Rust, plutôt de nature calme,il a fait partir Micorksen ( ouf )
            c'était incroyable et on raconte ça sur notre site ! ☮️
          </p>
        </div>
        <div class="m-3">
          <img
            src={gifMael}
            class="mx-auto"
            alt="Image GIF de l'avatar de Maël"
          />
          <h2 class="text-5xl text-teal-500 text-center">Maël</h2>
          <h3 class="text-2xl text-indigo-500 text-center">
            Fondateur, designer
          </h3>
          <hr />
          <p class="text-center">
            Et voici l'être adulé par tout le monde ! Maël ( avec le ë, c'est
            important ) ou aussi appelé par le nom point carré venant de mon
            pseudo " .² " 💯
          </p>
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
    </MetaProvider>
  );
};

export default AboutPage;

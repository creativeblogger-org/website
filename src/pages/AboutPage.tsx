import { Component } from "solid-js";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import gifRiccardo from "../assets/gif/gif-riccardo.gif";
import gifMael from "../assets/gif/gif-mael.gif";
import gifMicorksen from "../assets/gif/gif-micorksen.gif";

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
      <div class="grid grid-cols-3 m-6">
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
            et Rust, plutôt de nature calme, Micorksen ne lui mène pas la vie
            facile. Peace For Riccardo ! ☮️
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
        <div class="m-3">
          <img
            src={gifMicorksen}
            class="mx-auto"
            alt="Image GIF de l'avatar de Micorksen"
          />
          <h2 class="text-5xl text-teal-500 text-center">Micorksen</h2>
          <h3 class="text-2xl text-indigo-500 text-center">
            Développeur de l'API
          </h3>
          <hr />
          <p class="text-center">
            Notre dernier développeur, le fondateur de l'API, celui qui a
            invoquer notre pitié pour travailler avec Adonis, très extravertis
            mais malgré ça, toujours vivant ! 🔨
          </p>
        </div>
      </div>
      <div class="mt-12">
        <h1 class="text-center text-5xl text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500">
          Et voilà la fine équipe !{" "}
        </h1>
      </div>
    </MetaProvider>
  );
};

export default AboutPage;

import { Component, createSignal } from "solid-js";
import { Meta, MetaProvider, Title } from "@solidjs/meta";
import SmileyCool from "../assets/img/smiley-cool.png";
import Unique from "../assets/img/unique.png";

const BecomePage: Component = () => {
  const [showDiv1, setShowDiv1] = createSignal(true);
  const [showDiv2, setShowDiv2] = createSignal(false);

  function handleDiv1Click() {
    setShowDiv1(false);
    setShowDiv2(true);
  }
  function handleDiv2Click() {
    setShowDiv1(true);
    setShowDiv2(false);
  }
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
        <div>
          <h1 class="text-center mt-5 mb-10 text-3xl">
            Rejoindre notre équipe
          </h1>
          <h2 class="text-center m-7 text-2xl">Pourquoi ?</h2>
          {showDiv1() ? (
            <div
              class="bg-slate-800 w-3/4 md:w-1/2 rounded-md p-7 mx-auto border-4 duration-150 hover:cursor-pointer hover:border-indigo-500"
              onClick={handleDiv1Click}
            >
              <p class="flex justify-end text-white text-2xl">01, click me</p>
              <img class="" src={SmileyCool} alt="Nous sommes trooop cools !" />
              <h1 class="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-3xl text-center">
                Parce qu'on est troooop cool !
              </h1>
              <p class="text-white p-4">
                Chez Creative Blogger, l'ambiance est super sympa, on est très
                bienveillant ( depuis qu'on a viré l'élément nuisible de
                l'équipe ), et rien que pour ça, ça vaut le coup de s'y
                intéresser... je dis ça, je dis rien.
              </p>
            </div>
          ) : null}
          {showDiv2() ? (
            <div
              class="bg-slate-800 w-3/4 md:w-1/2 rounded-md p-7 mx-auto border-4 duration-150 hover:cursor-pointer hover:border-indigo-500"
              onClick={handleDiv2Click}
            >
              <p class="flex justify-end text-white text-2xl">02, click me</p>
              <img
                class=""
                src={Unique}
                alt="Car Creative Blogger est unique"
              />
              <h1 class="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-3xl text-center">
                Car Creative Blogger est unique
              </h1>
              <p class="text-white p-4">
                Creative Blogger est unique dans le paysage blogging français de
                par son idéologie du libre et gratuit, mais également par notre
                marketing et notre design. Nous rejoindre, c'est rejoindre un
                mouvement jamais vu en France, et, comme dit le dicton " il y a
                une première fois à tout "
              </p>
            </div>
          ) : null}
          <h1 class="text-3xl text-center mt-10 mb-10">Alors, convaincus ?</h1>
          <div class="flex justify-center">
            <a class="text-3xl pb-8" href="https://discord.gg/uT8zVVn6rQ">
              C'est ici !
            </a>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
};

export default BecomePage;

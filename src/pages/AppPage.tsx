import { Component } from "solid-js";
import MobileApp1 from "../assets/img/mobile-3.jpg";
import MobileApp2 from "../assets/img/mobile-2.png";
import MobileApp3 from "../assets/img/mobile-1.jpg";

const AppPage: Component = () => {
  return (
    <div>
      <h1 class="text-5xl font-pangolin pb-10 pt-4 text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-teal-500 text-center">
        L'ensemble de Creative Blogger dans une app
      </h1>
      <div class="">
        <div class="flex sm:justify-center mb-10">
          <img
            src={MobileApp1}
            class="rounded-xl h-96 m-0 p-0 mx-3 sm:mx-10"
            alt="Image de l'app mobile affichant les articles"
          />
          <div class="w-1/3 sm:w-1/5 text-xl sm:text-3xl">
            <h2>
              Retrouvez tous les articles de Creative Blogger centralisés en un
              endroit dans votre téléphone !
            </h2>
            <br />
            <a
              class="py-5 bg-teal-500 text-white p-1 sm:p-2 text-sm sm:text-2xl rounded-3xl sm:font-bold duration-200 hover:bg-teal-600"
              href="https://play.google.com/store/apps/details?id=org.creativeblogger.org&hl=fr"
            >
              Téléchargez-là
            </a>
          </div>
        </div>
        <div class="hidden sm:flex justify-center my-20">
          <div class="w-1/3 sm:w-1/5 text-xl sm:text-3xl">
            <h2>Éditez votre profile directement depuis l'app !</h2>
            <br />
            <a
              class="py-5 bg-indigo-500 text-white p-1 sm:p-2 text-sm sm:text-2xl rounded-3xl font-bold duration-200 hover:bg-indigo-600"
              href="https://play.google.com/store/apps/details?id=org.creativeblogger.org&hl=fr"
            >
              Téléchargez-là
            </a>
          </div>
          <img
            src={MobileApp2}
            class="rounded-xl h-96 m-0 p-0 mx-3 sm:mx-10"
            alt="Image de l'app mobile sur la page profile en train de modifier son profile"
          />
        </div>
        <div class="flex sm:justify-center mb-10">
          <img
            src={MobileApp3}
            class="rounded-xl h-96 m-0 p-0 mx-3 sm:mx-10"
            alt=""
          />
          <div class="w-1/3 sm:w-1/5 text-xl sm:text-3xl">
            <h2>Lisez confortablement vos articles favoris !</h2>
            <br />
            <a
              class="py-5 bg-teal-500 text-white p-1 sm:p-2 text-sm sm:text-2xl rounded-3xl sm:font-bold duration-200 hover:bg-teal-600"
              href="https://play.google.com/store/apps/details?id=org.creativeblogger.org&hl=fr"
            >
              Téléchargez-là
            </a>
          </div>
        </div>
        <a href="https://play.google.com/store/apps/details?id=org.creativeblogger.org&hl=fr&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            alt="Disponible sur Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
          />
        </a>
      </div>
    </div>
  );
};

export default AppPage;

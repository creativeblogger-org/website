import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component } from "solid-js";

const TermsPage: Component = () => {
  return (
    <MetaProvider>
      <Title>Creative Blogger</Title>
      <Meta
        name="description"
        content="Creative Blogger - Projet collaboratif entre bloggers"
      />
      <div class="flex justify-center">
        <h1>Politique de confidentialité & conditions d'utilisation</h1>
        <p class="p-2 rounded-md border m-5 w-1/2">
          Veuillez rester cordial dans vos propos. Vous pouvez y exprimer vos
          opinions tout en respectant celles des autres.
          <br />
          Vous seul êtes responsable de ce que vous postez, tout contenu inapproprié sera supprimé et l'auteur pourra être sanctionné par un bannissement temporaire ou définitif. Vous pouvez modifier ou supprimer vos posts et commentaires qui, dans ce cas, seront supprimés de la base de données.
          <br />
          Creative Blogger Org ne peut en aucun cas être tenu responsable du contenu posté par ses membres.
          <br />
          Nous vous rappelons également que, dans un cadre juridique, nous stockons votre IP.
          <br />
          Lors de l'inscription, nous collectons : <br />
          1. Votre nom d'utilisateur<br />
          2. Votre adresse e-mail<br />
          3. Votre mot de passe (dont seul le hash est stocké pour des raisons de sécurité)<br />
          4. Votre date de naissance
        </p>
      </div>
    </MetaProvider>
  );
};

export default TermsPage;

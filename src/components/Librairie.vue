<template>
  <img id="bcgimg" alt="fond" src="../assets/biblio2.jpg" />
  <img id="bcgimg2" alt="petite image" src="../assets/livres.jpg" />
  <LivreRecherche @rechercher="getLivresRecherche" />

  <table id="tableauRecherche">
    <thead id="tableauRecherche">
      <tr id="tableauRecherche">
        <th colspan="5">Livres correspondants à la recherche</th>
      </tr>
    </thead>
    <tbody id="corpsR">
      <tr>
        <td id="titreRecherche">Titre</td>
        <td id="qteRecherche">Quantite en stock</td>
        <td id="prixRecherche">Prix</td>
        <td id="changeRecherche">Changer</td>
      </tr>
      <tr v-for="livre of livreRecherche" :key="livre.id">
        <!-- <div id="resRecherche"> -->
        <LivreItem
          :livre="livre"
          @soustraire="MinusOne"
          @ajouter="addOne"
          @delete="deleteLivre"
        />
      </tr>
    </tbody>
  </table>
  <!-- </div> -->
  <FormLibrairie @ajouterLivre="ajouterNouveauLivre"> </FormLibrairie>

  <table id="tableau2">
    <thead id="titretableau2">
      <tr id="titretableau2">
        <th colspan="5">Stock de la librairie</th>
      </tr>
    </thead>
    <tbody id="corps">
      <tr>
        <td id="titretableau2">Titre</td>
        <td id="qtestocktableau2">Quantite en stock</td>
        <td id="prixtableau2">Prix</td>
        <td id="changetableau2">Changer</td>
      </tr>
      <tr v-for="livre in mesLivres" :key="livre.id">
        <LivreItem
          :livre="livre"
          @soustraire="MinusOne"
          @ajouter="addOne"
          @delete="deleteLivre"
        />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre.js";
import FormLibrairie from "@/components/FormLibrairie.vue";
import LivreItem from "@/components/LivreItem.vue";
import LivreRecherche from "@/components/LivreRecherche.vue";

const mesLivres = reactive([]);
const livreRecherche = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/21/livres";

function getLivres() {
  let fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      mesLivres.splice(0, mesLivres.length);
      dataJSON.forEach((l) =>
        mesLivres.push(new Livre(l.id, l.titre, l.qtestock, l.prix))
      );
      /*for (let livre of mesLivres) {
          if (livre.qtestock === 0) {
            supprimer(livre.id);
          }*/
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function ajouterNouveauLivre(titre, qtestock, prix) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

function deleteLivre(id) {
  let fetchOptions = { method: "DELETE" };
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      getLivres();
      getLivresRecherche();
    })
    .catch((error) => console.log(error));
}

function addOne(livre) {
  livre.addQtestock();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      getLivres();
    })
    .catch((error) => console.log(error.message));
}
function MinusOne(livre) {
  livre.substractQtestock();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      if (livre.qtestock === 0) {
        deleteLivre(livre.id);
      }
      getLivres();
    })
    .catch((error) => console.log(error.message));
}

function getLivresRecherche(titreCle) {
  let fetchOptions = { method: "GET" };
  fetch(url + "?search=" + titreCle, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      livreRecherche.splice(0, livreRecherche.length);
      dataJSON.forEach((l) =>
        livreRecherche.push(new Livre(l.id, l.titre, l.qtestock, l.prix))
      );
      /*for (let livre of mesLivres) {
          if (livre.qtestock === 0) {
            supprimer(livre.id);
          }*/
    })
    .catch((error) => {
      console.log(error.message);
    });
}

onMounted(() => {
  getLivres();
  getLivresRecherche();
});
</script>

<style>
body {
  margin: 0px;
  background-color: #006400;
}
#bcgimg {
  position: absolute;
  width: 100%;
  z-index: -1;
}

#bcgimg2 {
  width: 10%;
  height: auto;
  position: absolute;
  top: 15%;
  left: 15%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}

table#tableauRecherche,
td#tableauRecherche,
tr#tableauRecherche {
  border-spacing: 30px;
  text-align: center;
  color: #FFC0CB;
  border: 5px solid #FFC0CB;
  border-radius: 60px;
  background-color: #006400;
  margin-left: 67%;
  margin-top: 20px;
}

table#tableau2,
td#tableau2,
tr#tableau2 {
  text-align: center;
  font-size: 20px;
  color: #006400;
  border-collapse: separate;
  border-spacing: 30px;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  background: #FFC0CB;
  column-width: auto;
  padding: 20px;
  border-radius: 50px;
}
thead#titretableau2 {
  padding: 30px;
  font-size: 40px;
  color: #006400;
  border-radius: 50px;
  text-decoration: underline;
}

button {
  background-color: #FFC0CB;
  border-radius: 30px;
  border-color: grey;
  color: #006400;
}
button:hover {
  background-color: #006400;
  color: #FFC0CB;
  transition: 0.3s;
  cursor: pointer;
}

/*On enleve les flèches pour monter ou descendre un à un les chiffres*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

[type="number"] {
  border-radius: 30px;
  border-width: 1px;
  text-align: center;
  box-shadow: 1px 2px black;
}

::placeholder {
  color: #006400;
  font-family: "Lucida Sans", sans-serif;
}
</style>
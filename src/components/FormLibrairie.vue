<script setup>
const emit = defineEmits(["ajouterLivre"]);
</script>
<template>
  <form @submit.prevent="$emit('ajouterLivre', titre, qtestock, prix)">
    <fieldset>
      <legend>Ajouter un nouveau livre</legend>
      <input
        id="ajoutLivre"
        type="text"
        placeholder="Titre du livre"
        v-model="titre"
        required
      />
      <input
        id="quantite"
        type="number"
        min="0"
        placeholder="Quantite"
        v-model="qtestock"
        required
      />
      <input
        id="prix"
        type="number"
        min="0"
        placeholder="Prix"
        v-model="prix"
        required
      />
      <input type="submit" value="Ajouter" />
    </fieldset>
  </form>
</template>

<style>
input[type="submit"] {
  background-color: #FFC0CB;
  border-radius: 30px;
  border-color: grey;
  color: #006400;
}
input[type="submit"]:hover {
  background-color: #006400;
  color: #FFC0CB;
  transition: 0.3s;
  cursor: pointer;
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
input:focus {
  outline: none;
}

fieldset {
  color: #006400;
  padding: 10px 8px;
  border-radius: 30px;
  margin-bottom: 50px;
  margin-top: 30px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
#ajoutLivre,
#quantite,
#prix {
  border-radius: 30px;
  border-width: 1px;
  border-color: grey;
  text-align: center;
  box-shadow: 1px 2px black;
  background: #FFC0CB;
  padding: 20px;
  font-size: 20px;
  color: #006400;
  margin-right: 20px;
}
#ajoutLivre {
  width: 30%;
}

#quantite,
#prix {
  width: 15%;
}

#ajouter {
  padding: 20px;
  border-radius: 100px;
}

legend {
  color: #006400;
  font-size: 30px;
  font-weight: bolder;
  background-color: pink;
  border-radius: 70px;
  padding: 5px;
}
</style>
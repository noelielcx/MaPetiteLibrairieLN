<template>
  <form @submit.prevent="$emit('rechercher', titreCle)">
    <label for="recherche"></label>
    <input
      id="recherche"
      type="text"
      class="recherche"
      v-model="titreCle"
      placeholder="Rechercher un livre"
    />
    <input type="submit" class="nonVisible" value="Rechercher" />
  </form>
</template>

<script setup>
const emit = defineEmits(["rechercher"]);
</script>

<style scoped>
form {
  margin-left: 70%;
  margin-top: 50px;
}
#recherche {
  margin-right: 10px;
  height: 25px;
  border-radius: 20px;
  margin-top: 1px;
  text-align: center;
  font-size: 1.05em;
  color: #006400;
}
#recherche:focus {
  border-color: #006400;
}
</style>
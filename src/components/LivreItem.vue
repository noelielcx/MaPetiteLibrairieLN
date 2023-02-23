<template>
  <td>{{ livre.titre }}</td>
  <td>{{ livre.qtestock }}</td>
  <td>{{ livre.prix }}€</td>
  <td>
    <button v-bind:id="livre.id" @click="$emit('soustraire', livre)">-</button>
    <button v-bind:id="livre.id" @click="$emit('ajouter', livre)">+</button>
    <button v-bind:id="livre.id" @click="$emit('delete', livre.id)">
      Supprimer
    </button>
  </td>
</template>


<script setup>
defineProps(["livre"]);
const emit = defineEmits(["soustraire", "ajouter", "delete"]);
</script>

<style scoped>
button {
  background-color: #FFC0CB;
  border-radius: 30px;
  border-color: grey;
}

button:hover {
  background-color: #006400;
  color: #FFC0CB;
  transition: 0.3s;
  cursor: pointer;
}
</style>
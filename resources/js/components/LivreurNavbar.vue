<template>
  <div class="flex justify-center items-center pt-3 pb-2 ">
    <router-link class=" text-sm font-medium uppercase text-gray-600 hover:text-gray-800 hover:no-underline focus:text-red-300 px-2 " @click="store.methodes.showCategoreis" :to="{ name: 'categoreis' }">Categoreis</router-link>
    <span class=" text-sm font-medium text-gray-600 "> -</span>
    <router-link class=" text-sm font-medium uppercase text-gray-600 hover:text-gray-800 hover:no-underline  focus:text-red-300  px-2" @click="store.methodes.showOrders" :to="{ name: 'orders' }" >Orders</router-link>
  </div>
  
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");

    return { store };
  },
};
</script>

<style>
.link {
  font-variant: all-small-caps;
  font-weight: 700;
  padding: 10px;
}
</style>
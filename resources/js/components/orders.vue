<template>
  <div class="container">
    <div class="justify-content-center d-flex">
      <button class="btn btn-sm btn-primary px-2 my-3 mx-2" @click="Noveau">
        EN ATTEND
      </button>
      <button class="btn btn-sm btn-primary px-2 my-3 mx-2" @click="livre">
        LIVRE
      </button>
      <button class="btn btn-sm btn-primary px-2 my-3 mx-2" @click="Tout">
        TOUT
      </button>
    </div>
    <div class="w-full  overflow-x-scroll md:overflow-visible lg:overflow-visible ">
      <table id="" class="m-auto mb-8">
        <tr>
          <th
            class="py-1 px-2 bg-green-600 border-green-600 border-l-2 text-white uppercase font-bold text-center text-sm"
          >
            name
          </th>
          <th
            class="py-1 px-2 bg-green-600 text-white uppercase font-bold text-center text-sm"
          >
            description
          </th>
          <th
            class="py-1 px-2 bg-green-600 text-white uppercase font-bold text-center text-sm"
          >
            category et prix
          </th>
          <th
            class="py-1 px-2 bg-green-600 text-white uppercase font-bold text-center text-sm"
          >
            ordre par
          </th>
          <th
            class="py-1 px-2 bg-green-600 text-white uppercase font-bold text-center text-sm"
          >
            date
          </th>
          <th
            class="py-1 px-2 bg-green-600 border-green-600 border-r-2 text-white uppercase font-bold text-center text-sm"
          >
            statu
          </th>
        </tr>
        <tr
          class="py-3 text-center border-b-2 border-green-600 odd:bg-red-300"
          v-for="(order, index) in store.state.all_orders"
          :key="order.user.id"
        >
          <td class="border-green-600 border-l-2">{{ order.name }}</td>
          <td class="border-green-600 border-l-2">{{ order.description }}</td>
          <td class="border-green-600 border-l-2">
            {{ order.category.category_name }} - prix:
            {{ order.category.price }}
          </td>
          <td class="border-green-600 border-l-2">
            <span
              class="cursor-pointer text-sm underline font-bold text-blue-600"
              data-toggle="modal"
              :data-target="'#usermodal' + index"
              >{{ order.user.name }}</span
            >
          </td>
          <td class="border-green-600 border-l-2">{{ order.created_at }}</td>
          <td class="border-green-600 border-l-2 border-r-2 " :class="{ redd : order.statu=='new'}">
            <span
              v-if="order.statu == 'new'"
              @click="store.methodes.livred(order.id)"
              class=" cursor-pointer block bg-red-500 text-white font-bold w-full h-full hover:bg-red-300 hover:text-gray-600"
            >
              livré
            </span>
            <span v-else>Livré</span>
          </td>
          <div
            class="modal fade"
            :id="'usermodal' + index"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title font-bold" id="exampleModalLabel">
                    Information sur {{ order.user.name }}
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="text-justify">
                    <tr>
                      <td class="font-bold text-gray-900">Nom :</td>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <td class="font-bold text-gray-900">Address :</td>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <td class="font-bold text-gray-900">Tel :</td>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <td class="font-bold text-gray-900">Email :</td>
                      <td>{{ order.user.email }}</td>
                    </tr>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Quitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
export default {
  setup() {
    const store = inject("store");
    onMounted(() => {
      store.methodes.GetAllOrders();
    });
    const orders = ref([]);
    const Noveau = () => {
      console.log("Show only new");
      store.state.all_orders = store.state.all_orders_tool.filter((order) => {
        return order.statu == "new";
      });
      console.log("orders = ", orders);
    };
    const livre = () => {
      console.log("Show only livre");
      store.state.all_orders = store.state.all_orders_tool.filter((order) => {
        return order.statu == "livre";
      });
      console.log("orders = ", orders);
    };
    const Tout = () => {
      store.state.all_orders = store.state.all_orders_tool;
    };
    return { store, Noveau, livre, Tout, orders };
  },
};
</script>

<style>
.redd{
    background-color: #ef4444;
}
</style>

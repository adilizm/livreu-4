<template>
<div ref="alert"></div>
    <div
      v-if="!store.state.new_user.register_user_is_valide"
      class="alert alert-danger alert-dismissible fade show my-3"
      role="alert"
    >
      <strong>Attention!!</strong>
      {{ store.state.new_user.register_user_error }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div
      v-if="store.state.new_user.register_user_sucess"
      class="alert alert-success alert-dismissible fade show my-3"
      role="alert"
    >
      <strong>-- félicitation -- </strong> Votre compte a été créé
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  <div class="flex justify-center items-center">

    <div
      class="shadow-md overflow-hidden flex justify-center m-8 p-0 rounded-2xl">
      <!-- div image left side -->
      <div class="text-center text-gray-900 font-bold m-8 hidden md:block">
        <!-- image login -->
        <img src="/logoandstaff/login.png" alt="login mage" />
        <span class="text-gray-800 font-extrabold"
          >© 2020 Tous droits réservés.</span
        >
      </div>
      <!-- div content right side -->
      <div class="bg-blue-100 px-12 pb-20 sm:w-auto">
        <!-- hello good morning div -->
        <div class="ml-0 mr-3 transition ease-in-out transform hover:translate-x-4">
          <span class="text-blue-600 text-lg font-bold block mt-3 -mb-2 "
            >Bonjour!</span
          >
          <span class="text-blue-900 text-xl font-bold block -mt-3 mb-3"
            >Bon Retour</span
          >
        </div>
        <!-- login form  -->
        <div  v-if="!store.state.create_new_account" class="text-center">
          <div class="mt-8">
            <span class="font-bold text-blue-900 uppercase"
              >connectez-vous</span
            >
          </div>
          <div class="mt-3">
            <!--    <label class="flex justify-start left-0 z-50" for="Email">Email</label> -->
            <input
              type="text"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="Email"
              v-model="store.state.user.email"
            />
          </div>
          <div class="mt-3">
            <!--  <label class="flex justify-start left-0 z-50" for="Email">Password</label> -->
            <input
              type="password"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="Mot de pass"
              v-model="store.state.user.password"
            />
          </div>
          <!-- login and create account buttons -->
          <div>
            <button
              class="bg-blue-600 text-white font-bold border-blue-600 border-opacity-20 py-1 px-10 mt-7 rounded-xl hover:bg-indigo-800 transition ease-in-out transform hover:scale-105"
              @click="store.methodes.login"
            >
              Connexion
            </button>
            <button
              class="block text-blue-700 py-1 px-10 mt-3 transition ease-in-out transform hover:scale-105 hover:scale-x-110"
              @click="store.methodes.createNewAccount"
            >
              créer un compte
            </button>
          </div>
        </div>
          <!-- inscription form -->
        <div v-else>
           <div class="mt-8">
            <span class="font-bold text-blue-900 uppercase">inscrivez-vous</span>
          </div>
              <div class="mt-3 flex">
            <span class="text-red-600">*</span>
            <input
              type="text"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="nom"
                v-model="store.state.new_user.name"
            />
          </div>
             <div class="mt-3 flex">
            <span class="text-red-600">*</span>
            <input
              type="text"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="email"
              v-model="store.state.new_user.email"            />
          </div>
             <div class="mt-3 flex">
            <span class="text-red-600">*</span>
            <input
              type="password"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="Mot de pass"
              v-model="store.state.new_user.password"/>
          </div>
            <div class="mt-3 flex">
            <span class="text-red-600">*</span>
            <input
              type="password"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="confermer le Mot de pass"
              v-model="store.state.new_user.confirm_password"/>
          </div>
         <div class="mt-3 flex">
            <span class="text-blue-100">*</span>
            <input
              type="text"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="Votre address"
              v-model="store.state.new_user.address"/>
          </div>
          <div class="mt-3 flex">
            <span class="text-blue-100">*</span>
            <input
              type="number"
              class="block border-b-2 border-gray-400 bg-blue-100 focus:border-blue-600 transform focus:scale-125 focus:mt-4 delete-style-for-focus-visible z-0 transition ease-in"
              placeholder="Votre Num Telephone"
              v-model="store.state.new_user.tel"/>
          </div>
            <div>
            <button
              class="bg-blue-600 text-white font-bold border-blue-600 border-opacity-20 py-1 px-10 mt-7 rounded-xl hover:bg-indigo-800 transition ease-in-out transform hover:scale-105"
              @click.prevent="store.methodes.registerNewUser"
            >
              créer un compte
            </button>
            <button
              class="block text-blue-700 py-1 px-10 mt-3 transition ease-in-out transform hover:scale-105 hover:scale-x-110"
              @click="store.methodes.backToLogin"
            >
              retour connexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = inject("store");
    const router = useRouter();
    let alert= ref(null)
    let a = store.state.userconected;
    watch(a, () => {
      if (store.state.userconected) {
        console.log("hello");
        router.push({ name: "Userside" });
      }
    });
    watch(store.state.new_user.register_user_is_valide,()=>{
        console.log('store.state.new_user.register_user_is_valide = ' ,store.state.new_user.register_user_is_valide)
    })
    watchEffect(() => {
      if (store.state.userconected) {
        router.push({ name: "Userside" });
      } else if (store.state.livreurconected) {
        router.push({ name: "Livreurside" });
      }
    });

    return { store ,alert};
  },
};
</script>

<style>
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
.Welcome {
  font-size: xxx-large;
  font-family: cursive;
  font-weight: bold;
  color: #007cfc;
}
.bg-light {
  background-color: #e7e7e7 !important;
}
.connect {
  margin-left: auto;
}
.max-50 {
  max-width: 50%;
}
.delete-style-for-focus-visible:focus-visible {
  outline: 0px dashed rgba(255, 255, 255, 0);
}
</style>
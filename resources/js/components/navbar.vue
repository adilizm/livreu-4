<template>
  <nav class="bg-gray-50 shadow-md z-10 flex justify-between">
    <a
      class="navbar-brand pl-3 d-flex justify-content-center text-center items-center"
      href="#"
    >
      <img
        class="align-middle mx-2"
        src="/logoandstaff/logo.png"
        width="50"
        height="50"
        alt=""
      />
      <span
        class="capitalize text-xl text-blue-500 font-bold"
        style="font-family: Goblin One"
        >Livraison</span
      >
    </a>
    <div class="flex">
      <div
        v-if="store.state.userconected || store.state.livreurconected"
        @click="store.methodes.logout"
        class="mr-1 cursor-pointer justify-center items-center hover:text-gray-900 flex font-medium transform hover:-translate-x-4 transition ease-in-out"
      >
        <span>Logout</span>
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            /></svg
        ></span>
      </div>
      <div
        v-if="store.state.userconected || store.state.livreurconected"
        class="mr-3 cursor-pointer justify-center items-center hover:text-gray-900 flex font-medium"
      >
        <span data-toggle="modal" data-target="#profileSettingModal"
        @click="setup_profile_image"
          ><svg
            data-toggle="modal"
            data-target="#exampleModal"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 h-6 transform hover:rotate-90 transition ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            /></svg
        ></span>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <div
    class="modal fade"
    id="profileSettingModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Editer votre profile
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
          <div>
            <div class="flex justify-content-center">
              <div class="relative rounded-full overflow-hidden">
                <img
                  id="picture"
                  class="rounded-full w-52 h-52 cursor-pointer"
                  src="/images/elonmusk.jpg"
                  alt=""
                
                />
                <div
                  class="absolute bottom-0 w-full h-10 flex justify-content-center"
                  style="background-color: rgba(0, 0, 0, 0.548)"
                >
                  <span
                    class="text-white font-bold cursor-pointer"
                    @click="click_toChange_profile"
                    >Changer la photo</span
                  >
                  <input
                    @change="Change_profile"
                    type="file"
                    ref="image"
                    hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watch } from "vue";
export default {
  setup() {
    const store = inject("store");
    const image = ref(null);
    const profile_image = ref(null);
    let a = 1;
    const click_toChange_profile = () => {
      image.value.click();
     
    };
    function Change_profile(){
      console.log("image profile changed");
       if (image.value.value) {
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (!validExtensions.includes(image._value.files[0].type)) {
          console.log("This is not a picture");
        } else {
          readURL(image);
          store.state.new_profile_img=image.value.files[0];
          store.methodes.saveImageprofile()
            console.log("profile should be updated");
        }
      }
    }

    const readURL = (image) => {
      var reader = new FileReader();
      reader.readAsDataURL(image.value.files[0]); // convert to base64 string
      reader.onload = function (e) {
        document.getElementById("picture").setAttribute("src", e.target.result);
      };
    };


function setup_profile_image(){
if(store.state.the_user['profile_img']==null) {
    document.getElementById("picture").setAttribute("src",'https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/d/9/a/d9a1058910_50163142_elon-musk1.jpg')
  }else{
    document.getElementById("picture").setAttribute("src",store.state.the_user['profile_img'])

  }
}
    return { store, Change_profile,click_toChange_profile, readURL, image ,profile_image,setup_profile_image};
  },
};
</script>
 
<style>
.nav-link {
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .navnav {
    margin-left: 45vw;
  }
}
@media only screen and (min-width: 601px) {
  .navnav {
    margin-left: 47vw;
  }
}
@media only screen and (min-width: 992px) {
  .navnav {
    margin-left: 75vw;
  }
  .bg-changer {
    background-color: rgba(0, 0, 0, 0.548);
  }
}
</style>

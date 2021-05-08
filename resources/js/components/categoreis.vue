<template>
  <div class=" grid md:grid-cols-2 lg:grid-cols-3 m-2 justify-items-center">
    <div
      class=" bg-white rounded-md overflow-hidden shadow-sm my-2 relative"
      v-for="category in store.state.categoreis"
      :key="category.id"
    >
      <img
        class=""
        :src="category.image_url"
        :alt="category.name"
      />
      <div class=" px-5">
        <span class=" font-bold text-gray-500 text-sm">{{ category.category_name }} <strong class=" text-yellow-500"> ({{category.price}} dh)</strong></span>
        <span class=" block text-gray-500 text-sm">{{ category.category_description }}</span>
      </div>
      <div @click="store.methodes.deleteCategory(category.id)" class=" absolute text-red-500 top-2.5 right-3 transform hover:scale-110 transition ease-in-out cursor-pointer hover:bg-white rounded-md"><svg class=" h-6 " xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></div>
    </div>
   
  
</div>
      <!-- Button trigger modal -->
      <div class="flex justify-center text-center ">
      <button
        type="button"
        class=" bg-blue-400 py-4 px-5 font-bold text-lg rounded-lg cursor-pointer hover:bg-blue-600 text-white mt-2 mb-6"
        data-toggle="modal"
        data-target="#category_modal"
      >
        Ajouter Catégorie
      </button>
  </div>
  
  <!-- Modal new category -->
  <div
    class="modal fade"
    id="category_modal"
    tabindex="-1"
    aria-labelledby="category_modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="category_modalLabel">Noveau categorie</h5>
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
          <div class="mb-5">
            <form
              class="mb-3"
              @submit="store.methodes.saveNewCategory"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <label for="formGroupExampleInput">nome</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="store.state.new_category.name"
                  id="formGroupExampleInput"
                  placeholder="name"
                />
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">description</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  v-model="store.state.new_category.description"
                  placeholder="description"
                />
              </div>
                 <div class="form-group">
                <label for="formGroupExampleInput3">prix</label>
                <input
                  type="number"
                  class="form-control"
                  id="formGroupExampleInput3"
                  v-model="store.state.new_category.price"
                  placeholder="price"
                />
              </div>
              <div class="form-group" ref="input_image">
                <label for="formGroupExampleInput3">image</label>
                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="inputGroupFile01"  ref="image"  v-on:change="store.methodes.onChange" aria-describedby="inputGroupFileAddon01">
                      <label class="custom-file-label" ref="image_name" for="inputGroupFile01"></label>
                    </div>
                  </div>
                <!-- <input
                  type="file"
                  class="form-control"
                  v-on:change="store.methodes.onChange"
                  id="formGroupExampleInput3"
                  ref="image"
                /> -->
              </div>
              <div class="d-flex justify-content-center">
                <img
                  v-if="store.state.new_category.image"
                  style="max-width: 300px"
                  id="category_picture"
                  src=""
                  alt=""
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent=""
                  data-dismiss="modal"
                >
                  Quitter
                </button>
                <button
                  type="button"
                  @click="gg"
                  class="btn btn-success"
                  data-dismiss="modal"
                 
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watch } from "vue";
export default {
  setup() {
    const image = ref(null);
    const store = inject("store");
    const input_image = ref(null)
    let image_name = ref('Choose Category image')
const gg = ()=>{
  console.log('Emm nice');
  store.methodes.saveNewCategory()
   image_name.value.textContent=" Choose an image";
}

    onMounted(() => {
      store.methodes.getCategoreis();

      console.log('image_name = ',image_name.value);
      image_name.value.textContent=" Choose an image";
    });

    watch(
      () => store.state.new_category.image,
      () => {
        readURL(image);
        console.log("wata rak tged 3liha ghi4 khdem");
      }
    );

    function readURL(image) {
      if (image.value.files && image.value.files[0] && store.state.new_category.image) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document
            .getElementById("category_picture")
            .setAttribute("src", e.target.result);
            console.log("e.target.result = ",e.target.result);
            image_name.value.textContent = image.value.value;
        };
        reader.readAsDataURL(image.value.files[0]); // convert to base64 string
      }else{
      
        console.log('this is the file',image)
      }
    }
    return { store, image ,gg,input_image,image_name};
  },
};
</script>

<style>
#categories {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#categories td,
#categories th {
  border: 1px solid #ddd;
  padding: 8px;
}

#categories tr:nth-child(even) {
  background-color: #f2f2f2;
}

#categories tr:hover {
  background-color: #ddd;
}

#categories th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
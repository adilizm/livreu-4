import { reactive } from "@vue/reactivity";

const state = reactive({
    the_user: [],
    create_new_account: false,
    login_info: true,
    userconected: false,
    livreurconected: false,
    new_profile_img:null,
    user: {
        email: "adilizm@izm.com",
        password: "123123",
    },
    new_user: {
        name: "salima",
        email: "@izm.com",
        password: "123123",
        confirm_password: "123123",
        address: "Hay sallam agadir",
        tel: "0600000000",
        register_user_is_valide: true,
        register_user_error: "",
        register_user_sucess: false,
    },
    categoreis: [],
    new_category: {
        name: "",
        description: "",
        image: null,
        price: 0
    },
    showorders: true,
    showCategoreis: false,
    order: {
        name: "",
        description: "",
        user_id: 0,
        category_id: 0,
    },
    User_orders: [],
    all_orders: [],
    all_orders_tool: [],
});

const methodes = {
    createNewAccount() {
        state.create_new_account = true;
    },
    backToLogin() {
        state.create_new_account = false;
    },
   async registerNewUser() {
        var email_validation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        console.log("register new user is called");
        state.new_user.register_user_is_valide = true;
        if (state.new_user.name.length < 4) {
            console.log("eeeeeeeemmmmmmmmmmmmmmmmm");
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "le nom doit comporter au moins 4 caractères";
        } else if (!email_validation.test(state.new_user.email)) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error = "votre email est invalide ";
        } else if (state.new_user.password.length < 6) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "le mot de pass doit comporter au moins 6 caractères";
        } else if (state.new_user.password != state.new_user.confirm_password) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "La confirmation du mot de passe ne correspond pas au mot de passe";
        }else if (state.new_user.address.length < 10) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "Votre address est incorect";
        } else if (state.new_user.tel.length < 10 || state.new_user.tel.length > 13  ) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "Votre Telephone est incorect";
        } 
        if (state.new_user.register_user_is_valide) {
            console.log("new user = ", state.new_user);

            let info = {
                name: state.new_user.name,
                email: state.new_user.email,
                password: state.new_user.password,
                confirm_password: state.new_user.confirm_password,
                address: state.new_user.address,
                tel: state.new_user.tel,
            };
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
      // when even you get an 419 or 404 error code check the url and csrf  even if url works fine on postman
            await axios.get('/api/gg').then(res=>console.log(res)) // initialise to avoid the bug
            axios
                .post("/api/register",info)
                .then(
                    (response) => {
                        (state.new_user.name = ""),
                            (state.new_user.email = ""),
                            (state.new_user.password = ""),
                            (state.new_user.confirm_password = ""),
                            (state.new_user.address = ""),
                            (state.new_user.tel = ""),
                            (state.new_user.register_user_error = ""),
                            (state.new_user.register_user_is_valide = true),
                            (state.new_user.register_user_sucess = true),
                            (state.create_new_account = false),
                            console.log(
                                "registred by sanctom res = ",
                                response
                            );
                    },
                    (error) => {
                        state.new_user.register_user_is_valide = false;
                        state.new_user.register_user_error = error.message;
                    }
                );
        } else {
            console.log("this is not a valid user");
        }
    },
    async login() {
        state.new_user.register_user_is_valide = true;
        var email_validation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        if (!email_validation.test(state.user.email)) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error = "votre email est invalide ";
        }
        console.log("login new user is called");
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        console.log('user = ',state.user)
        await axios.get('/api/gg').then(res=>console.log(res)) // initialise to avoid the bug
        axios
            .post("api/login", state.user, config)
            .then((res) => {
                console.log(res);
                state.the_user["name"] = res.data.data.name;
                state.the_user["token"] = res.data.data.token;
                state.the_user["Role"] = res.data.data.Role;
                state.the_user["id"] = res.data.data.id;
                state.the_user["profile_img"] = res.data.data.profile_img;
                console.log("the user in store is  = ", state.the_user);
                if (res.data.data.Role === "cliente") {
                    state.userconected = true;
                    state.order.user_id =res.data.data.id;
                } else if (res.data.data.Role === "livreur") {
                    state.livreurconected = true;
                }
            })
            .catch((error) => {
                state.login_info = false;
            });
    },
    logout() {
        console.log("logout user is called");
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };

        axios
            .post("api/logout",config)
            .then((res) => {
                state.the_user=[],
                state.userconected = false;
                state.livreurconected = false;
                state.user.email = "";
                state.user.password = "";
                console.log("user is loged out and token = ",  state.the_user['token']);
            })
            .catch((error) => {});
    },
    getCategoreis() {
        state.categoreis = [];
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        axios
            .get("api/getCategoreis",config)
            .then((res) => {
                console.log("categoreis are = ", res);
                state.categoreis = res.data;
            })
            .catch((error) => {});
    },

    saveNewCategory() {
        
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": state.the_user['token'],
            },
        };
        let data = new FormData();
        data.append("name", state.new_category.name);
        data.append("description", state.new_category.description);
        data.append("image", state.new_category.image);
        data.append("price", state.new_category.price);

        axios
            .post("api/new_category", data, config)
            .then((res) => {
                console.log("categoreis ", res);
                methodes.getCategoreis();
                state.new_category.name='',
                state.new_category.description='',
                state.new_category.image=false,
                state.new_category.price=0
            })
            .catch((error) => {
                console.log("there is an error");
            });
    },
    onChange(e) {
      
        state.new_category.image = e.target.files[0];
      //  console.log("e = ", e);
    
},
saveImageprofile() {
    
    const config = {
        headers: {
            "content-type": "multipart/form-data",
            "Authorization": state.the_user['token'],
        },
    };
    let data = new FormData();
    data.append("new_profile_img", state.new_profile_img);
    data.append("user_id", state.the_user['id']);
    axios
    .post("api/update_Profile_image", data, config)
    .then((res) => {
        console.log('Profile image updated and link should be = ',res.data);
        state.the_user['profile_img']=res.data;
    })
    .catch((error) => {
        console.log("Profile image not updated",error);
    });

},
    showOrders() {
        state.showorders = true;
        state.showCategoreis = false;
        console.log("showorders = ", state.showorders);
        console.log("showCategoreis = ", state.showCategoreis);
    },
    showCategoreis() {
        state.showorders = false;
        state.showCategoreis = true;
        console.log("showorders = ", state.showorders);
        console.log("showCategoreis = ", state.showCategoreis);
    },
    createOrder() {
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        axios
            .post("api/new_order", state.order,config)
            .then((res) => {
                console.log("responce = ", res);
                methodes.CurrentUserorders();
            })
            .catch((error) => {});
    },
    CurrentUserorders() {
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        state.User_orders = [];
        let link = "api/CurrentUserOrders/".concat(
            state.order.user_id
        );

        axios
            .get(link,config)
            .then((res) => {
                state.User_orders = res.data;
                console.log(' user_orders are  = ',state.User_orders);
                console.log("User_orders = ", state.User_orders);
                state.User_orders.forEach((order) => {
                    order.created_at = order.created_at.slice(0, -8);
                    order.created_at = order.created_at.replace("T", " ");
                });
            })
            .catch((error) => {});
    },
    GetAllOrders() {
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        state.all_orders = [];
        axios
            .get("api/allOrders",config)
            .then((res) => {
                console.log('All orders = ',res)
                state.all_orders = res.data;
                state.all_orders.forEach((order) => {
                    order.created_at = order.created_at.slice(0, -8);
                    order.created_at = order.created_at.replace("T", " ");
                });
                state.all_orders_tool = state.all_orders;
            })
            .catch((error) => {});
    },
    livred(order_id) {

        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        console.log("the button is = ", order_id);
        let link = "api/orderlivre/".concat(order_id);
        axios
            .get(link,config)
            .then((res) => {
                state.all_orders.forEach((order) => {
                    if (order.id == order_id) {
                        order.statu = "livre";
                    }
                });
            })
            .catch((error) => {});
    },
    deleteCategory(category_id){
        const config = {
            headers: {
                "Authorization": state.the_user['token'],
            },
        };
        let link = "api/deleteCategory/".concat(category_id);
        axios
            .get(link,config)
            .then((res) => {
                methodes.getCategoreis();
            })
            .catch((error) => {});
    }
};

export default {
    state,
    methodes,
};

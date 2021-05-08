import { createRouter, createWebHistory } from 'vue-router'

import Home from '../js/views/Home.vue';
import Userside from '../js/components/Userside.vue';
import Livreurside from '../js/components/Livreurside.vue';



 let routes= [
    {
        path: '',
        name: 'home',
        component: Home
    },{
        path: '/cote-cliente',
        name: 'Userside',
        component: Userside
    },
    {
        path: '/cote-livreur',
        name: 'Livreurside',
        component: Livreurside
    },{
        path: '/cote-livreur/orders',
        name: 'orders',
        component: Livreurside
    },{
        path: '/cote-livreur/categoreis',
        name: 'categoreis',
        component: Livreurside
    }
]
const router = createRouter({
    history: createWebHistory("#"),
    routes
  })

export default router;
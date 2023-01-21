import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:"/",
            name:"home",
            component:() => import('@/components/HelloWorld.vue')
        },
        {
            path:"/system/role",
            name:"role",
            component:() => import('@/view/system/role.vue')
        },
        {
            path:"/system/menu",
            name:"menu",
            component:() => import('@/view/system/menu.vue')
        }
    ]
})

export default router
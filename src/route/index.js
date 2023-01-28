import { createRouter, createWebHistory } from "vue-router"
import { translateDataToTree } from "@/util/index"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import('@/view/login/index.vue')
        },
    ]
})
const main = {
    path: "/",
    name: "index",
    component: () => import('@/view/layout/index.vue'),
    children:[]
}
let modules = import.meta.glob('../view/**/*.vue')
const addRoutes = function (localMenus) {
    const menus = []
    localMenus.forEach((item) => {
        menus.push({
            id: item.id,
            parentId: item.parentId,
            path: item.path,
            name: item.name,
            component:modules[`../view${item.component}.vue`]
            // component:() => import(`../view${item.component}.vue`)
        })
    })
    main.children = translateDataToTree(menus)
    router.addRoute(main)
}
let menuLock = false
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
        if (to.path !== "/login") {
            if (!menuLock) {
                const localMenus = JSON.parse(localStorage.getItem('menus'))
                addRoutes(localMenus)
                menuLock = true
                next({ ...to, replace: true })
            }
        }
        next()
    } else {
        if (to.path !== "/login") {
            next("/login")
        }else{
            next()
        }
    }
    console.log(router.getRoutes())
})
export default router
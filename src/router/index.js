import Vue from 'vue'
import VueRouter from 'vue-router'
// 布局
import Layout from "@/components/layout.vue";

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [{
        path: "/home",
        name: "home",
        component: () => import('../views/home.vue')
      },
      {
        path: "/record",
        name: "record",
        component: () => import('../views/record.vue')
      },
      {
        path: "/store",
        name: "store",
        component: () => import('../views/store.vue')
      },
      {
        path: "/media",
        name: "media",
        component: () => import('../views/media.vue')
      },
      {
        path: "/class",
        name: "class",
        component: () => import('../views/class.vue')
      },
      {
        path: "/college",
        name: "college",
        component: () => import('../views/college.vue')
      },
      {
        path: "/veri",
        name: "veri",
        component: () => import('../views/veri.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'hash', //history
  base: process.env.BASE_URL,
  routes
})

export default router
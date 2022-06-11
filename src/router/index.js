import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/articles',
    name: 'MostPopularNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/Articles')
  },
  {
    path: '/categories',
    name: 'NewsByCategories',
    component: () => import(/* webpackChunkName: "about" */ '../views/Categories')
  },
  {
    path: '/articles/:id',
    name: 'single-article',
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleArticle')
  },
  {
    path: '/articles/:tag',
    name: 'articlesByTag',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticlesByTag')
  }
]

const router = new VueRouter({
  routes
})

export default router

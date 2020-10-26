import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import ProductEdit from '../views/ProductEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/product-edit/:id',
    name: 'ProductEdit',
    component: ProductEdit
  },
  {
    path: '/product-new',
    name: 'ProductEdit',
    component: ProductEdit
  },
]

const router = new VueRouter({
  routes
})

export default router

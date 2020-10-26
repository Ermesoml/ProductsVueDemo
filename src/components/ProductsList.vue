<template>
  <div>
    <draggable v-model="allProducts" @change="onChangeOrder" v-if="allProducts.length > 0">
      <ProductCard v-for="product in allProducts" :key="product._id" :product='product' v-on:deleteProduct="deleteProduct" />
    </draggable>
    <md-toolbar class="md-primary" v-else>
      <span class="md-title">No products found.</span>
    </md-toolbar>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import draggable from 'vuedraggable'

export default {
  name: 'ProductsList',
  props: {
    products: {
      type: Array,
      required: true
    },
  },
  components: {
    ProductCard,
    draggable
  },
  computed: {
    allProducts: {
        get() {
          return this.products
        },
        set() {
            // do nothing
        }
    }
  },
  methods: {
    deleteProduct(product) {
      this.$emit('deleteProduct', product);
    },
    onChangeOrder(product) {
      this.$emit('orderProductsChanged', product.moved);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>


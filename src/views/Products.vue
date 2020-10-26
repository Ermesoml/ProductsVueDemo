<template>
  <div class="home">
    <LoadingSpinner v-if="fetchingProducts"/>
    <ProductsList v-else :products='allProducts' v-on:deleteProduct="handleDeleteProduct" v-on:orderProductsChanged="handleOrderProductsChanged"/>
    <FabAddProduct/>

    <md-dialog-confirm
      :md-active.sync="modalActive"
      md-title="Delete product?"
      md-content="If you choose yes the product will be deleted and it will not be possible to be recovered"
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-confirm="onConfirmDelete" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductsList from '@/components/ProductsList.vue'
import FabAddProduct from '@/components/FabAddProduct.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'Products',
  data() {
    return {
      productEditing: {},
      modalActive: false,
      productToDelete: {},
    }
  },
  components: {
    ProductsList,
    FabAddProduct,
    LoadingSpinner
  },
  computed: mapGetters(['allProducts', 'fetchingProducts']),
  methods: {
    ...mapActions(['fetchProducts', 'removeProduct', 'updateProductsOrder']),
    handleDeleteProduct(product) {
      this.modalActive = true;
      this.productToDelete = product;
    },
    handleOrderProductsChanged(product) {
      this.updateProductsOrder(product);
    },
    onConfirmDelete () {
      this.removeProduct(this.productToDelete);
    },
  },
  created() {
    this.fetchProducts();
  }
}
</script>

<style lang="scss" scoped>
  .home {
    padding-top: 10px;
  }
</style>
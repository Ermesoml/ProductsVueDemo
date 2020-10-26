<template>
  <div>
    <md-card >
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ product.title }}</div>
          <div class="md-subhead"><strong class="text-currency">€ {{ product.price }}</strong></div>
          <div class="md-subhead">Created at {{ formatDate(product.date_created) }}</div>
        </md-card-header-text>

        <md-card-media>
          <img :src="product.image" style="max-width: 100px" alt="Avatar">
        </md-card-media>
      </md-card-header>

      <md-card-content>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-accent" @click.native="deleteProduct">Delete</md-button>
        <md-button :to="`/product-edit/${product._id}`" class="md-primary">Edit</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mixins } from '../utils/mixins'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
  },
  mixins: [mixins],
  methods: {
    deleteProduct() {
      this.$emit('deleteProduct', this.product);
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    background: hsla(0,0%,92.2%,.705);
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .text-currency {
    color: #086405;
  }
</style>


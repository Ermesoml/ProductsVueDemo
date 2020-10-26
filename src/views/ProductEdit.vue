<template>
  <div class="product-details">
    <!-- <form novalidate class="md-layout" @submit.prevent="validateProduct"> -->
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('title')">
            <label for="title">Title</label>
            <md-input name="ftitle" id="title" v-model="form.title" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
            <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('price')">
            <label for="price">Price</label>
            <md-input name="price" id="price" v-model="form.price" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.price.required">The price is required</span>
            <span class="md-error" v-else-if="!$v.form.price.minlength">Invalid price</span>
          </md-field>
        </div>
        
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('color')">
            <label for="color">Color</label>
            <md-input type="color" name="color" id="color" v-model="form.color" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.color.required">The color is required</span>
            <span class="md-error" v-else-if="!$v.form.color.minlength">Invalid color</span>
          </md-field>
        </div>

        <div class="md-layout-item md-size-100">
          <!-- <md-field :class="getValidationClass('tags')"> -->
            <!-- <label for="last-name">Tags</label> -->
            <md-chips v-model="form.tags" md-placeholder="Tags" :disabled="sending"></md-chips>
            <!-- <md-input name="last-name" id="last-name" v-model="form.tags" :disabled="sending" /> -->
            <!-- <span class="md-error" v-if="!$v.form.tags.required">The tags is required</span>
            <span class="md-error" v-else-if="!$v.form.tags.minlength">Invalid tags</span> -->
          <!-- </md-field> -->
        </div>

        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('image')">
            <label for="last-name">Image Url</label>
            <md-input name="last-name" id="last-name" v-model="form.image" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.image.required">The image is required</span>
            <span class="md-error" v-else-if="!$v.form.image.minlength">Invalid image</span>
          </md-field>
        </div>

        <md-card-actions>
          <md-button class="md-primary" :disabled="sending" @click.native="validateProduct">Save product</md-button>
        </md-card-actions>
      </div>
    <!-- </form> -->
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { mapActions, mapGetters } from 'vuex';

  import {
    required,
    minLength,
    decimal,
    minValue,
    url
  } from 'vuelidate/lib/validators'

  export default {
    name: 'ProductEdit',
    mixins: [validationMixin],
    data: () => ({
      form: {
        title: null,
        price: null,
        tags: [],
        image: null,
        color: "#ffffff"
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        title: {
          required,
          minLength: minLength(3)
        },
        price: {
          required,
          decimal,
          minValue: minValue(0),
        },
        tags: {
          required: false
        },
        image: {
          required,
          url
        },
        color: {
          required,
        }
      }
    },
    computed: mapGetters(['getProductById']),
    methods: {
      ...mapActions(['addProduct', 'updateProduct']),
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.title = null
        this.form.price = null
        this.form.color = null
        this.form.tags = []
        this.form.image = null
      },
      async saveProduct () {
        this.sending = true;

        if (this.productEditing) {
          await this.updateProduct(this.form);
        } else {
          await this.addProduct(this.form);
        }
         
        this.$router.push('/');
      },
      async validateProduct () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          await this.saveProduct()
        }
      },
      configProductEditing() {
        const productId = this.$route.params.id;

        if (productId) {
          this.productEditing = this.getProductById(productId);

          if (!this.productEditing) {
            alert('It was not possible to find the product that you are trying to edit. It may occur if you have passed a invalid ID or refresh the screem (making the vuex reseting and loosing the data that was fetched). You will be returned to the products list page.');
            this.$router.push('/');
            return;
          }
          
          this.form = this.productEditing;
        }
      }
    },
    created() {
      this.configProductEditing();
    }
  }
</script>

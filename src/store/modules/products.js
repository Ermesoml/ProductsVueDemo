// products module
import { get, post, put, del } from '../../utils/api'

const state = {
    fetchingProducts: false,
    products: []
};

const getters = {
    allProducts: state => {
        let sorted = Object.assign([], state.products);
        sorted.sort((a, b) => {
            if (a.order > b.order) return 1;
            if (b.order > a.order) return -1;

            return 0;
        })

        return sorted;
    },
    getProductById: (state) => (id) => {
        return state.products.find(product => product._id === id)
    },
    fetchingProducts: state => state.fetchingProducts,
};

const actions = {
    async fetchProducts({ commit }) {
        commit('setFetchingProducts', true);
        const response = await get('products');
        commit('setProducts', response.data);
        commit('setFetchingProducts', false);
    },
    async addProduct( { commit, state }, product) {
        product.order = state.products.length;
        product.date_created = new Date();
        const response = await post('products', product);
        commit('newProduct', response.data);
    },
    async updateProduct( { commit }, product) {
        const productEdit = Object.assign({}, product);
        const id = productEdit._id;
        delete productEdit._id;
        await put(`products/${id}`, productEdit);
        commit('updProduct', product);
    },
    async removeProduct( { commit }, product) {
        await del(`products/${product._id}`);
        commit('deleteProduct', product);
    },
    async updateProductsOrder( { getters, dispatch }, product) {
        let productsOrdered = Object.assign([], getters.allProducts);
        const fromIndex = product.oldIndex > product.newIndex ? product.newIndex : product.oldIndex;
        const toIndex = product.oldIndex > product.newIndex ? product.oldIndex : product.newIndex;

        for (let i = fromIndex; i <= toIndex; i++) {
            productsOrdered[i].order++;
            if (i === toIndex) {
                productsOrdered[i].order = fromIndex;
            }

            await dispatch('updateProduct', productsOrdered[i]);
        }
    }
};

const mutations = {
    setProducts: (state, products) => state.products = products,
    setFetchingProducts: (state, fetching) => state.fetchingProducts = fetching,
    newProduct: (state, product) => state.products.unshift(product),
    updProduct: (state, updatedProduct) => {
        const index = state.products.findIndex(t => t._id === updatedProduct._id);
        if(index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }        
    },
    deleteProduct: (state, product) => state.products = state.products.filter(p => product._id !== p._id),
};

export default {
    state, getters, actions, mutations
}
export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  getters: {
    products(state) {
      return state.items;
    },
    totalSum(state) {
      return state.total;
    },
    cartQuantity(state) {
      return state.qty;
    },
  },
  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    },
    removeProductFromCart(state, payload) {
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === payload.id
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      if (state.qty > 0) {
        state.qty = state.qty - prodData.qty;
      }
      state.total = state.total - prodData.price * prodData.qty;
    },
    addProductQuantity(state, payload) {
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === payload.id
      );
      const prodData = state.items[productInCartIndex];
      prodData.qty += 1;
      state.qty = state.qty + 1;
      state.total = state.total + prodData.price;
    },
    reducePorductQuantity(state, payload) {
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === payload.id
      );
      const prodData = state.items[productInCartIndex];
      if (prodData.qty > 1) {
        prodData.qty -= 1;
        state.qty--;
        state.total = state.total - prodData.price;
      }
    },
  },
  actions: {
    addProductToCart(context, payload) {
      context.commit('addProductToCart', payload);
    },
    removeProductFromCart(context, payload) {
      context.commit('removeProductFromCart', payload);
    },
  },
};

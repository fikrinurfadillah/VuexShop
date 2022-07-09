<template>
  <section>
    <input type="checkbox" name="selectAll" v-model="isSelectAll" />
    <label for="selectAll">Select All</label>
    <h2>Your Cart</h2>
    <h3>
      Total Amount: <base-badge mode="elegant">${{ cartTotal }}</base-badge>
    </h3>
    <ul>
      <cart-item
        v-for="item in cartItems"
        :key="item.productId"
        :prod-id="item.productId"
        :title="item.title"
        :image="item.image"
        :price="item.price"
        :qty="item.qty"
        :is-select-all="isSelectAll"
        ref="child"
      ></cart-item>
    </ul>
  </section>
</template>

<script>
import CartItem from '../components/cart/CartItem.vue';

export default {
  data() {
    return {
      isSelectAll: false,
      selected: [],
    };
  },
  components: {
    CartItem,
  },
  computed: {
    cartTotal() {
      return this.$store.getters['cart/totalSum'].toFixed(2);
    },
    cartItems() {
      return this.$store.getters['cart/products'];
    },
  },
  watch: {
    isSelectAll() {
      if (this.isSelectAll === true) {
        this.selected.push(this.cartItems);
      } else {
        this.selected = [];
      }
    },
  },
  mounted() {
    this.$watch(
      '$refs.child.itemChecked',
      (new_value) => (this.isSelectAll = new_value)
    );
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
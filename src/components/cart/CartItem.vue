<template>
  <li>
    <input type="checkbox" v-model="itemChecked" />
    <div>
      <img :src="image" :alt="title" />
    </div>
    <div>
      <h3>{{ title }}</h3>
      <div class="item__data">
        <div>
          Price per Item:
          <strong>${{ price }}</strong>
        </div>
        <div class="cart-quantity">
          <button @click="reduceQty">-</button>
          Quantity:
          <strong>{{ qty }}</strong>
          <!-- <input type="number" v-model="quantity" /> -->
          <button @click="addQty">+</button>
        </div>
      </div>
      <div class="item__total">Total: ${{ itemTotal }}</div>
      <button @click="remove">Remove</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['prodId', 'title', 'image', 'price', 'qty', 'isSelectAll'],
  data() {
    return {
      // quantity: this.qty,
      itemChecked: false,
    };
  },
  computed: {
    itemTotal() {
      return (this.price * this.qty).toFixed(2);
    },
  },
  watch: {
    qty() {
      return 'disabled';
    },
    itemChecked() {
      if (this.itemChecked === true) {
        this.$store.commit('cart/setGrandTotal', { id: this.prodId });
      } else if (this.itemChecked === false) {
        this.$store.commit('cart/resetGrandTotal', { id: this.prodId });
      }
    },
    $route() {
      this.itemChecked = false;
    },
    isSelectAll() {
      this.itemChecked = this.isSelectAll;
    },
  },
  methods: {
    remove() {
      this.$store.dispatch('cart/removeProductFromCart', { id: this.prodId });
    },
    addQty() {
      this.$store.commit('cart/addProductQuantity', {
        id: this.prodId,
        checked: this.itemChecked,
      });
    },
    reduceQty() {
      this.$store.commit('cart/reducePorductQuantity', {
        id: this.prodId,
        checked: this.itemChecked,
      });
    },
    // checked() {
    //   if (!this.itemChecked) {
    //     this.$store.commit('cart/setGrandTotal', {
    //       id: this.prodId,
    //       checked: this.itemChecked,
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
li {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  max-width: 25rem;
}

img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.item__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  border-bottom: 2px solid #474747;
  padding: 0.25rem 0;
  width: auto;
}

.cart-quantity button {
  /* display: flex; */
  /* align-content: center; */
  padding: 0.5rem 1rem;
}

button {
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

button:hover,
button:active {
  background-color: #53001c;
  border-color: #53001c;
}
</style>
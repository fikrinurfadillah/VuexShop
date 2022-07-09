<template>
  <section>
    <h2>Shop Admin</h2>
    <p>There isn't much to do at the moment - sorry ...</p>
    <div class="shop-admin-form">
      <input type="text" name="id" />
      <input type="text" name="image" />
      <input type="text" name="title" />
      <input type="text" name="description" />
      <input type="number" name="price" />
    </div>
  </section>
</template>

<style scoped>
section {
  text-align: center;
  margin: 3rem auto;
  max-width: 40rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 2rem;
}
.shop-admin-form input {
  display: block;
}
</style>
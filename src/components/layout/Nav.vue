<template>
<div id="nav">
  <div>
      <router-link class="navLinks" to="/">
        <span style="font-family: 'Big Shoulders Inline Text', cursive; font-size: 20px"> &#x269E; BooksForBetter &#x269F;</span>
      </router-link>
  </div>
  <div style="text-align: end;">
      <router-link class="navLinks" to="/">
        <span>Home</span>
      </router-link> |
      <router-link class="navLinks" to="/mvp-books">
        <span>MVP Books</span>
      </router-link> |
          <router-link class="navLinks" to="/signup">
        <span>Free Sign Up</span>
      </router-link> |
      <router-link class="navLinks" to="/login">
        <span>Login</span>
      </router-link> |
      <router-link class="navLinks" to="/about">
        <span>About Us</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Inline+Text&display=swap');
#nav{
  background-color: #053d4a;
  margin: -8px;
  padding: 20px;
  display: grid;
  grid-template-columns: 30% 70%;

}
span{
  color: antiquewhite;
}

</style>
<template>
  <div class="hello">
    <div v-if="Object.keys(book).length > 0">
      <h1>{{book.title}}</h1>
      <img :src="book.imageUrl" alt="bookImg" height="500" width="550">
      <p>By: {{book.authorName}}</p>
      <a 
        :href="`https://www.goodreads.com/search?utf8=%E2%9C%93&search%5Bquery%5D=${book.title}&search_type=books`" 
        target="blank"
      >
        Read More
      </a>
    </div>
    <div v-else>
      <h1>
        Please search for a book <router-link to="/">Here.</router-link>
      </h1>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
export default {
  name: 'ViewBook',
  data () {
    return {
      book: store.book
    }
  },
  beforeCreate(){
    document.body.className = 'viewBook';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
    <div class="bookOnList">
        <img :src="book.imageUrl" alt="bookImg" height="115" width="100">
        <div style="padding: 0 10px;">
          <p><strong>Title:</strong> {{book.title}}</p>
          <p><strong>Author:</strong> {{book.authorName}}</p>
        </div>
    </div>
</template>

<script>
// import store from '../store.js'
export default {
    name: 'Book',
    props: ['book'],
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookOnList{
      border: 1px solid darkgrey;
      margin: 10px;
      width: 95%;
      display: inline-flex;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      text-align: initial;

  }

  .bookOnList:hover{
    cursor: pointer;
      box-shadow: -2px 5px 5px rgb(2 2 2 / 40%);
  }
</style>

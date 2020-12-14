<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="homeContainer">
    <form v-on:keydown.enter.prevent="searchBooks">
      <div id="inputContainer">
        <input type="text" v-model="search" @input="handleChange()" placeholder="Search book" />
        <button type="button" @click.stop='searchBooks'>Search</button>
      </div>
      <div id="filterContainer">
        <ul v-if="showFilter && !showResults" id="filterList">
            <li 
              v-for="(book, i) in filter" 
              :key="i+100"
              class="book"
              @click.stop="handleFilterClick(book)"
            >
            {{book.title.length > 40 ? (
              `${book.title.substring(0, 40)}..., by  ${book.authorName}`
            ) : (
              `${book.title}, by  ${book.authorName}`
            )}}
            </li>
        </ul>
      </div>
      <div id="extraLinks">
          <a style="margin: 5px" href="https://www.goodreads.com/list/show/1.Best_Books_Ever" target="blank">Famous books</a>
          <a style="margin: 5px" href="https://www.goodreads.com/author/on_goodreads" target="blank">Famous Authors</a>
      </div>
    </form>
    <div id="loading" v-if="loading">
      <img
        src="https://i.stack.imgur.com/qq8AE.gif"
        alt="loading"
        height="90"
        width="100"
      />
    </div>
    <div id="showResults" v-if="showResults && !showFilter && !loading">
      <h3 style="text-align: center">{{results.length}} Results for: {{search}}</h3>
      <div
        v-for="(item, i) in results"
        :key="i/37"
        @click.stop="viewBook(item)"
      >
        <Book :book="item" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Book from '@/components/Book.vue'
import store from '../store.js';

export default {
  name: "Home",
  components: {Book},
  data() {
    return {
      results: [],
      filter: [],
      showFilter: false,
      showResults: false,
      search: '',
      loading: false
    };
  },
      beforeCreate() {
        document.body.className = 'home';
    },
  methods: {
    //handles input to search
    handleChange() {
      // if input is not blank then search
      if(this.search !== '') {
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.get(`https://goodreads-server-express--dotdash.repl.co/search/${this.search}`)
        .then(res => {
          //show filter when searching
          this.showFilter = true;
          this.showResults = false
          this.filter = res.data.list.slice(0, 5);
          this.results = res.data.list;
        })
        .catch(err =>{
          console.log("Error: ",err)
        })
      } else {
        //clearing the filters
        this.filter = [];
        this.showFilter = false
        this.showResults = false
      }
    },
    //handles when clicking on a filter
    handleFilterClick(book){
      this.search = `${book.title}, by  ${book.authorName}`
      this.showFilter = false;
      this.showResults = false
    },
    // handles when the search button is clicked
    searchBooks(){
      if(this.search !== '') {
        this.filter = [];
        //loading until the request happens
        this.loading = true;
        this.showFilter = false;
        this.showResults = true;
        axios.defaults.headers.common['Content-Type'] = 'application/json'

        // aditional api provided by google books
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.search}`)
        .then(response =>{
          // using data from apis
          response.data.items.forEach(book => {
            // pushing the books from the google api in the right format
            this.results.push({
              title: book.volumeInfo.title,
              imageUrl: book.volumeInfo.imageLinks && Object.keys(book.volumeInfo.imageLinks).length > 0? book.volumeInfo.imageLinks.thumbnail : 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png',
              authorName: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors[0] : 'Not Available'
            })
            //stoping loading
            this.loading = false;
          })
        })
        .catch(err =>{
          console.log("Error: ",err)
        })
      }
    },
    viewBook(book){
      store.book = book;
      this.$router.push(`book/${book.title}`)
    }
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>

  form {
    position: fixed;
    top: 45%;
    left: 30%;
    width: 40%;
  }

  input[type="text"] {
    height: 55px;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    font-size: 17px;
    padding: 0px 20px;
    margin-bottom: 10px;
    margin-left: 0;
    box-sizing: border-box;
    width: 89%;
    background-color: #ffffff;
  }


  #inputContainer {
    width: 99%;
    display: inline-flex;
    /* margin-bottom: 14px; */
    height: 55px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
  }

  button[type="button"] {
    border: 0;
    border-radius: 5px;
    height: 55px;
    font-size: 18px;
    padding: 0 15px;
    color: #ffffff;
    background-color: #4a9de4;
  }
  button:hover {
    cursor: pointer;
    border: 1px solid #ffffff; 
  }

  input[type="text"]:focus, button[type="button"]:focus {
    outline: none
  }

  #filterList{
      list-style-type: none;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 5px 20px;
  }

  li{
    font-size: 14px;
    color: #676767;
    }

  li:hover{
    cursor: pointer;
    background-color: #bcd5ea;
    color: #000000;
  }

  #filterContainer{
      width: 99%;
      margin: -10px 0px 0px 5px;
      text-align: initial;
  }

  #extraLinks{
    /* text-align: center; */
    margin-top: 20px;
  }

  #showResults{
      height: 40%;
      border: 5px solid #d8e7ec;
      position: fixed;
      top: 58%;
      left: 30%;
      width: 39.2%;
      overflow: auto;
      background-color: #ffffff;
      border-radius: 5px;
  }

  #loading{
    position: fixed;
    top: 60%;
    left: 30%;
    width: 39%;
    background-color: #ffffff;
    text-align: center;
    border-radius: 5px;
  }
</style>
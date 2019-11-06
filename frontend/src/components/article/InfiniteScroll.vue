<template>
  <div class="app">
  
    <h2>{{msg}}</h2>
    
    <ul>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
      <li v-for="photo in photos" :key="photo.id">
      <img :src="photo.thumbnailUrl" height="30"> <br>
       <p>Title: {{photo.title}}</p> <br>
      <img :src="photo.url" height="200"/>  <br>
      <hr>
      <br>
      </li>
      </div>
    </ul>
    </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "InfiniteScroll",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      photos: [],
      results: [],
      busy: false,
      limit: 10
    };
  },
  methods: {
   

    loadMore() {
      
      console.log("scrolling");
      
      this.busy = true;   
      axios.get("https://jsonplaceholder.typicode.com/photos").then(res => {
        
        const append = res.data.slice(this.photos.length,this.photos.length + this.limit )
               
        this.photos = this.photos.concat(append);
        
      this.busy = false;
      }).catch( (err) => {
        this.busy = false;
      })
        
    
    }
  },
  created() {
   this.loadMore();
  

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

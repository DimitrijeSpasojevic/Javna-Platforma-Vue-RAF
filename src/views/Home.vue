<template>
  <div id="home">
    <div>
      <b-dropdown id="dropdown-1" text="Kategorije" class="m-md-2">
        <b-dropdown-item v-for="category in categories" :key="category.id" @click="getByCategoryName(category.name)">{{ category.name }}</b-dropdown-item>
      </b-dropdown>
    </div>
    <div  ref="articlesByCategory" style="visibility: hidden">
      <h2>Po kategorijama</h2>
      <ul class="no-bullets">
        <li v-for="articleFromCat in articlesFromCategory" :key="articleFromCat.id" >
          <Article :article="articleFromCat"></Article>
        </li>
      </ul>
      <h2>Po kategorijama kraj</h2>
    </div>
    <ul class="no-bullets">
      <li v-for="article in articles" :key="article.id" >
        <Article :article="article"></Article>
      </li>
    </ul>



  </div>
</template>

<script>
// @ is an alias to /src
import Article from '@/components/Article.vue'

export default {
  name: 'Home',
  components: {
    Article
  },
  data() {
    return {
      categories: [],
      articles: [],
      articlesFromCategory: []
    }
  },
  methods: {
    getByCategoryName(categoryName){
      this.$refs.articlesByCategory.style.visibility = 'visible';
      this.$axios.get('/api/news/category/' + categoryName + '/0').then((response) => {
        this.articlesFromCategory = response.data;
      });
      console.log(this.articlesFromCategory)
    }
  },
  created() {
    this.$axios.get('/api/category').then((response) => {
      this.categories = response.data;
    });
    this.$axios.get('/api/news').then((response) => {
      this.articles = response.data;
      console.log(this.articles)
    });
  }
}
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul.no-bullets li {
  margin: 1cm;
  padding: 0;
}
</style>

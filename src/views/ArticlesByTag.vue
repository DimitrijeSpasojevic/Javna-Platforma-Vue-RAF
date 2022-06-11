<template>
  <div class="articles">
    <ul class="no-bullets">
      <li v-for="article in articles" :key="article.id" >
        <Article :article="article"></Article>
      </li>
    </ul>
  </div>
</template>

<script>
import Article from "../components/Article";

export default {
  name: "Articles",
  components: {Article},
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.$axios.get(`/api/news/tags/${this.$route.params.tag}`).then((response) => {
      this.articles = response.data;
    });
  }
}
</script>

<style scoped>
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

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
      selectedArticle: null,
      articles: [],
      tekst: '',
      naslov: '',
      tags:'',
      categories:[],
      selectedCategory: '',
      pageNum: 0
    }
  },
  created() {
    this.$axios.get('/api/news/most-visited').then((response) => {
      this.articles = response.data;
    });
    this.$axios.get('/api/category').then((response) => {
      this.categories = response.data;
    });
  },
  methods:{

    getArticlesByPage(action){
      if(action == 'prev'){
        if(this.pageNum != 0)
          this.pageNum--;
      }else{
        this.pageNum++;
      }
      this.$axios.get('/api/news/offset/' + this.pageNum).then((response) => {
        this.articles = response.data;
      });
    },
    showForm() {
      this.$refs.formNewArticle.style.visibility = "visible"
      this.$refs.btnAdd.disabled = false
      this.$refs.articleTitleInput.value = ''
      this.$refs.articleTextInput.value = ''
      this.$refs.articleTagsInput.value = ''
      this.$refs.select.selectedIndex = 0
    },
    preUpdateArticle(article) {
      this.selectedArticle = article
      this.$refs.formNewArticle.style.visibility = "visible"
      this.$refs.articleTitleInput.value = article.title
      this.$refs.articleTextInput.value = article.text
      this.$refs.articleTagsInput.value = article.keyWords
      this.$refs.select.value = article.categoryName
      this.$refs.btnUpdateArticle.style.visibility = "visible"
      this.$refs.btnAddArticle.disabled = true
    },
    updateArticle(){
      const index = this.articles.indexOf(this.selectedArticle);
      this.$axios.put('/api/news', {
        id: this.selectedArticle.id,
        title: this.naslov,
        text: this.tekst,
        authorEmail: localStorage.getItem('authorEmail'),
        categoryName: this.selectedCategory,
        keyWords: Array.from(this.tags.split(",")),
      })
          .then((response) => {
            // this.categories[index] = response.data
            this.articles.splice(index, 1, response.data)
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      this.$refs.btnAddArticle.disabled = false
      this.$refs.btnUpdateArticle.style.visibility = "hidden"
      this.$refs.formNewArticle.style.visibility = "hidden"
    },
    deleteNews(article){
      console.log("delet se desio")
      this.$axios.delete('/api/news/' + article.id).then(() => {
        const index = this.articles.indexOf(article);
        if (index > -1) {
          this.articles.splice(index, 1);
        }
      });
    },
    addNewArticle() {
      this.$axios.post('/api/news', {
        title: this.naslov,
        text: this.tekst,
        authorEmail: localStorage.getItem('authorEmail'),
        categoryName: this.selectedCategory,
        keyWords: Array.from(this.tags.split(",")),
      })
          .then((response) => {
            this.articles.push(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
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

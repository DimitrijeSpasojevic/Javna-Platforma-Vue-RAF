<template>
  <div>
    <div class="card">
      <div class="card-header">
        {{ article.categoryName }}
      </div>
      <div class="card-body">
        <h5 class="card-title">Naslov: {{  article.title }}</h5>
        <p class="card-text" >Atutor Email: {{ article.authorEmail }}</p>
        <p class="card-text fifty-chars" >{{ article.text }}</p>
        <p class="card-text">Datum objave: {{ new Date(article.date).toLocaleDateString('en-US') }}</p>
      </div>
      <h5>Tags:</h5>
      <ul class="no-bullets">
        <li v-for="( tag , index) in tags" :key="index" >
          <router-link :to="{ name: 'articlesByTag', params: { tag: tag.keyWord }}">{{ tag.keyWord }}</router-link>
        </li>
      </ul>
    </div>

    <form @submit.prevent="addComment">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="inputName" type="text" class="form-control" id="name" placeholder="Enter name" required>
      </div>
      <div class="form-group">
        <label for="comment">Comment</label>
        <input v-model="inputComment" type="text" class="form-control" id="comment" placeholder="Enter comment" required>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Dodaj komentar</button>
    </form>

    <ul class="no-bullets">
      <li v-for="comment in comments" :key="comment.id" >
        <Comment :comment="comment"></Comment>
      </li>
    </ul>
  </div>

</template>

<script>
import Comment from "../components/Comment";
export default {
  name: "SingleArticle",
  components: {Comment},
  data() {
    return {
      comments: [],
      article: {},
      tags: [],
      inputComment: '',
      inputName: ''
    }
  },
  methods:{
    addComment(){
      this.$axios.post(`/api/comments`, {
        author: this.inputName,
        text: this.inputComment,
        newsId: this.article.id
      })
          .then((response) => {
            this.comments.push(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  created() {
    this.$axios.get(`/api/comments/${this.$route.params.id}`).then((response) => {
      this.comments = response.data;
    });
    this.$axios.get(`/api/news/${this.$route.params.id}`).then((response) => {
      this.article = response.data;
      console.log(this.article)
    });
    this.$axios.get(`/api/news/${this.$route.params.id}/tags`).then((response) => {
      this.tags = response.data;
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

form {
  margin-top: 1cm;
  margin-bottom: 1cm;
}
</style>

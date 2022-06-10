<template>
  <div class="card">
    <div class="card-header">
      {{ article.categoryName }}
    </div>
    <div class="card-body">
      <h5 class="card-title">Naslov: {{  article.title }}</h5>
      <p class="card-text fifty-chars" >{{ article.text }}</p>
      <p class="card-text">Datum objave: {{ new Date(article.date).toLocaleDateString('en-US') }}</p>
      <a href="#" class="btn btn-primary">Procitaj</a>
    </div>
  </div>
</template>

<script>

export default {
  name: "Article",
  props: {
    article: {
      title: String,
      text: String,
      authorEmail: String,
      categoryName: String,
      keyWords: [],
      date: Date,
      id: Number,
      numberOfVisits: Number,
    }
  },
}
</script>

<style scoped>
.fifty-chars {
  width: 50ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

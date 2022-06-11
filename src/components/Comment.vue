<template>
  <div>
    <h5>
      Author: {{ comment.author }}
    </h5>
    <p>
      {{ comment.text }} <br>
    </p>
    <p>Komentara dodat: {{ new Date(comment.date).toLocaleDateString('en-US') }}</p>
  </div>
</template>

<script>

export default {
  name: "Comment",
  props: {
    comment: {
      id: Number,
      author: String,
      text: String,
      date: '',
      newsId: String
    }
  },
}
</script>

<style scoped>

</style>

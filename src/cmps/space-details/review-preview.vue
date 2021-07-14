<template>
  <section class="review-preview">
        <p>Review: {{review}} </p>

        <div class="like" @click="like"></div>
        <img src="" alt="">
        <button>next img</button>
        <button>prev img</button>

    </section>
</template>

<script>

export default {
  name: '',
  props: ['review'], 
  methods: {
      
  },
  components: {
      reviewList,
  }
  
}
</script>


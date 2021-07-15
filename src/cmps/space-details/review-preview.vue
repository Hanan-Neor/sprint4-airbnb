<template>
  <section class="review-preview">
    <div class="review-details">
      <img :src="review.by.imgUrl" alt="" class="avatar" />
      <p class="user-name">{{ review.by.fullname }}</p>
    </div>
    <div class="review-txt">{{ review.txt }}</div>
  </section>
</template>

<script>
export default {
  name: '',
  props: { review: Object },
  methods: {},
  components: {},
};
</script>

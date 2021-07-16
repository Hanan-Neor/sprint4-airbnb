<template>
  <section class="show-more-container">
    <!-- <p v-if="textLength">{{ text }}</p> -->
    <p class="text pointer" @click="toggleShow">
      <span v-if="!open">{{ textToShow }}</span>
      <span v-else>{{ textToShow }} <span>Read more...</span> </span>
    </p>
  </section>
</template>

<script>
export default {
  props: { text: String },

  data() {
    return {
      open: true,
    };
  },

  computed: {
    textToShow() {
      // if (!this.open) return this.text;
      if (!this.open) return this.text;
      // return this.text.substring(0, 100);
    },

    // textLength() {
    //   return this.text < 100;
    // },
  },

  methods: {
    toggleShow() {
      this.open = !this.open;
    },
  },
};
</script>
<style></style>

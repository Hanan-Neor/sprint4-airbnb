<template>
  <div v-if="imgUrls" class="space-imgs" :class="pics">
    <img :src="img" v-for="(img, idx) in imgUrls.slice(0, 5)" :key="idx" />
  </div>
</template>

<script>
export default {
  props: { imgUrls: Array },

  computed: {
    pics() {
      return `pics-${this.imgUrls.length}`;
    },
  },
};
</script>

<style></style>

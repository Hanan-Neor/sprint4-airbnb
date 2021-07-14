<template>
  <div class="space-imgs">
    <img :src="img" alt="" v-for="img in imgUrls" :key="img" />
  </div>
</template>

<script>
export default {
  props: { imgUrls: Array },
};
</script>

<style></style>

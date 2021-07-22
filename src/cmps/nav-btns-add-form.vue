<template>
  <div class="nav-btns" v-if="currentTab !== 0">
    <button
      class="nav-btn next"
      type="button"
      id="prevBtn"
      @click="nextPrev(-1)"
    >
      Previous
    </button>
    <button
      v-if="currentTab !== 8"
      class="nav-btn prev"
      type="button"
      id="nextBtn"
      @click="nextPrev(1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: ['currentTab'],

  methods: {
    nextPrev(diff) {
      this.$emit('nextPrev', diff);
    },
  },
};
</script>

<style></style>

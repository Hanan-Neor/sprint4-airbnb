<template>
  <div class="pagination flex">
    <p @click="gotoPage(currPage-1)">&lt;</p>
    <!-- <template  class="pageNums"> -->
    <p
      :style="getColors(num)"
      @click="gotoPage(num)"
      v-for="num in numPages"
      :key="num"
    >
      {{ num }}
    </p>
    <!-- </template> -->
    <p @click="gotoPage(currPage+1)">&gt;</p>
  </div>
</template>

<script>
export default {
  props: ["pageSize", "numSpaces"],
  data() {
    return {
      currPage: 1,
      numPages: Math.ceil(this.numSpaces / this.pageSize),
    };
  },
  methods: {
    gotoPage(num) {
      if (num === 0 || num > this.numPages) return;
      this.currPage = num;
      this.$emit("setPage", this.currPage);
    },
    getColors(num) {
      if (this.currPage === num) {
        return {
          background: this.currPage === num ? "#222222" : "inherit",
          color: this.currPage === num ? "white" : "inherit",
        };
      }
    },
  },
};
</script>

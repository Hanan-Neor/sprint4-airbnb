<template>
  <div
    @click="clicked"
    class="text-filter filter-div filter-div-hover"
    :class="{ clicked: isTextClicked }"
  >
    <div
      @click.stop="clearFilter('Text')"
      v-if="isTextClicked && filterBy.location"
      class="clear-button"
      style="width: 24px; height: 24px"
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
          display: block;
          fill: none;
          height: 12px;
          width: 12px;
          stroke: currentcolor;
          stroke-width: 4;
          overflow: visible;
        "
      >
        <path d="m6 6 20 20"></path>
        <path d="m26 6-20 20"></path>
      </svg>
    </div>
    <!-- <div></div> -->
    <label for="text">Location</label>
    <input
      @submit="filterSpaces"
      autocomplete="off"
      ref="location"
      name="text"
      type="text"
      placeholder="Where are you going?"
      v-model="filterBy.location"
    />
    <!-- <input
            @focus="clicked('Text-input')"
            @blur="clicked('Text-input')"
            @change="filterSpaces"
            autocomplete="off"
            ref="location"
            name="text"
            type="text"
            placeholder="Where are you going?"
            v-model="filterBy.location"
          /> -->
  </div>
</template>

<script>
export default {
  props: ["filterBy"],
  data() {
    return {
      isTextClicked: false,
      // filterBy:{
      //     location:''
      //            }
    };
  },
  methods: {
    clicked() {
      this.$refs["location"].focus();
      this.isTextClicked = true;
    //   this.isTextClicked = !this.isTextClicked;
    },

    close(e) {
     
     
        if (!this.$el.contains(e.target)) {
            alert('hi')
          this.isTextClicked = false;
        }
      
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style>
</style>
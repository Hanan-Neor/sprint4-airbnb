<template>
  <!-- <ul class="space-list grid" v-if="spaces"> -->
  <section class="space-list" v-if="spaces.length">


    <!-- <div v-for="space in spaces" :key="space._id" class="space-list grid"> -->
        <space-preview @liked="liked" :space="space" 
         v-for="space in spaces" :key="space._id"/>
    <!-- </div> -->
  </section>
  <section v-else>
    <img class="svg-img-loader" src="@/assets/img/loading.svg" />
  </section>
</template>



<script>
import spacePreview from "./space-preview.vue";
export default {
  props: ["spaces"], 
  name: "spaceList",
  methods: {
      liked(spaceId) {
          this.$emit('liked', spaceId)
      }
  },
  components: {
    spacePreview,
  },
};
</script>


<template>
  <ul class="space-list grid" v-if="spaces">


    <li v-for="space in spaces" :key="space._id" class="space-list grid">
        <space-preview @liked="liked(spaceId)" />
    </li>
  </ul>
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


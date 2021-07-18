<template>
  <button @mousemove="changeGradient" class="gradient-btn" :style="background">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
  },

  data() {
    return {
      mouseX: 100,
      mouseY: 100,
    };
  },

  computed: {
    background() {
      return (
        'background: radial-gradient(circle at ' +
        this.mouseX +
        'px ' +
        this.mouseY +
        'px, #e61e4d 27.5%, #e31c5f 40%, #d70466 57.5%,  #bd1e59 75%,  #bd1e59 100%)'
      );
    },
  },

  methods: {
    changeGradient(ev) {
      const rect = this.$el.getBoundingClientRect();
      this.mouseX = ev.clientX - rect.left;
      this.mouseY = ev.clientY - rect.top;
    },
  },
};
</script>

<style></style>

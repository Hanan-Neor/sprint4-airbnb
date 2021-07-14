<template>
  <section class="space-preview">
    <router-link :to="'/space/' +space._id">
      <div class="buttons">
        <button @click.prevent="prevPic">◁</button>
        <button @click.prevent="nextPic">▷</button>
      </div>
      <!-- <img :src="`${space.imgUrls[2]}`" /> -->
      <!-- <div class="img-container"> -->
        <img :src="`${imgForDisplay}`" />
      <!-- </div> -->
      <div class="name-price flex">
        <div>{{ space.name }}</div>
        <div>{{ space.price }} / nigth</div>
      </div>
      <div>200 Kilometers away</div>
      <div class="like" @click="like"></div>
      <!-- <hr/>
        {{space}} -->
    </router-link>
  </section>
</template>

<script>
export default {
  name: "",
  props: ["space"], //TODO convert to object
  data() {
    return {
      picIdx: 0,
    };
  },
  methods: {
    like() {
      this.$emit("liked", this.space._id);
    },
    prevPic() {
      if (this.picIdx === 0) this.picIdx = this.space.imgUrls.length - 1;
      else this.picIdx--;
    },
    nextPic() {
      if (this.picIdx === this.space.imgUrls.length - 1) this.picIdx = 0;
      else this.picIdx++;
    },
  },
  computed: {
    imgForDisplay() {
      return this.space.imgUrls[this.picIdx];
    },
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

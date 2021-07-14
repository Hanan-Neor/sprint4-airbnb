<template>
  <section class="space-preview">
        <p>Space: {{space}} </p>

        <div class="like" @click="like"></div>
        <img src="" alt="">
        <button>next img</button>
        <button>prev img</button>

    </section>
</template>

<script>

export default {
  name: '',
  props: ['space'], //TODO convert to object
  methods: {
      like(){
          this.$emit('liked', this.space._id)
      },
      
  },
  components: {
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

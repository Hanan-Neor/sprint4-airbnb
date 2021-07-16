<template>
<section>
  up to {{limit}} guests <el-input-number v-model="num" @change="handleChange" :min="1" :max="limit"></el-input-number>
  </section>
</template>
<script>
  export default {
      props:['limit'],
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        // console.log(value)
        this.$emit('guestsCnt',value)
      }
    }
  };
</script>
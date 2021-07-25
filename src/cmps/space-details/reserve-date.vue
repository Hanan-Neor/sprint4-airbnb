<template>
  <section class="date-picker">
    <el-date-picker
      @change="date"
      v-model="dates"
      type="daterange"
      range-separator=""
      start-placeholder="CHECK-IN"
      end-placeholder="CHECKOUT"
      style="background-color:inherit; border:0px; height=100%"
    >
    </el-date-picker>
  </section>
</template>

<script>
export default {
  // props:['dates'],
  data() {
    return {
      dates: '',
    };
  },

  methods: {
    date() {
      this.dates = this.dates ? this.dates : '';
      this.$emit('dateToReserve', this.dates);
    },
  },
};
</script>

<script>
import { Pie } from "vue-chartjs";

export default {

  props: ['spaceNames', 'spaceRatings'],
  computed:{
    test(){return [65, 59, 80, 81, 56, 55, 40]}
  },
  extends: Pie,
  mounted() {
    console.log('ratings', this.spaceRatings);
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.spaceNames, //["Red", "Blue", "Yellow"],
      // datasets: [{
      //       data: [0, 0],
      //   }, {
      //       data: [0, 1]
      //   }, {
      //       data: [1, 0],
      //   }],
      datasets: [
        {
          label: "My First Dataset",
          // data: [this.spaceRatings],
          data: this.spaceRatings,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  },
};
</script>

<style>
</style>
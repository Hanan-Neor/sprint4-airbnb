<script>
import { Pie } from "vue-chartjs";

export default {

  props: ['spaceNames', 'spaceRatings'],
  computed:{
    spaceNamesC(){return this.spaceNames},
    spaceRatingsC(){ return this.spaceRatings},
  },
  extends: Pie,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.spaceNames, //["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
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
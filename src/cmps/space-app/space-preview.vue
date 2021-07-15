<template>
  <section class="space-preview">
    <router-link :to="'/space/' + space._id">
      <!-- <div class="block">
    
    <el-carousel height="314px"  class="img-container" :autoplay="false">
      <el-carousel-item  v-for="img in imgsForDisplay" :key="img">
                <img  :src="`${img}`" />

      </el-carousel-item>
    </el-carousel>
  </div> -->

      <!-- <i class=el-icon-collection-tag></i> -->

      <!-- <?xml version='1.0' encoding='UTF-8'?> -->
      <!-- <svg
        @click.prevent="like"
        class="svg"
        v-bind:class="{liked:isLiked}"
        width="20px"
        height="20px"
        viewBox="0.0025 0.0025 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(0.0025, 0.0025)">
          <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
            <g transform="translate(-0.0025, -0.0025)">
              <g transform="matrix(0.75, 0, 0, 0.75, 0, 0)">
                <g transform="translate(0, 0)">
                  <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
                    <g
                      id="Layer_1"
                      transform="translate(-4, -4)"
                      style="enable-background: new 0 0 32 32"
                    >
                      <g id="Favorites_1_">
                        <path
                          d="M28, 11C28, 7.1 25.1, 4 21.5, 4C19.1, 4 17.1, 5.4 16, 7.4C14.9, 5.4 12.8, 4 10.5, 4C6.9, 4 4, 7.1 4, 11C4, 11 4, 11.2 4, 11.2C4, 16.1 8.1, 20.2 14.3, 26.3L16, 28L17.7, 26.3C23.9, 20.2 28, 16.1 28, 11.2C28, 11.2 28, 11 28, 11z"
                          stroke="white"
                          stroke-width="2px"
                          fill="black"
                          fill-opacity="50%"
                          class="Yellow"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg> -->

      <div class="buttons">
        <button @click.prevent="prevPic">
          <i class="el-icon-arrow-left"></i>
        </button>
        <button @click.prevent="nextPic">
          <i class="el-icon-arrow-right"></i>
        </button>
      </div>
      <!-- <?xml version='1.0' encoding='UTF-8'?> -->
      <svg
      style="svgcolor"
        class="svg"
        v-bind:class="{ liked: isLiked }"
        width="20px"
        height="20px"
        viewBox="0.0025 0.0025 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(0.0025, 0.0025)">
          <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
            <g transform="translate(-0.0025, -0.0025)">
              <g transform="matrix(0.75, 0, 0, 0.75, 0, 0)">
                <g transform="translate(0, 0)">
                  <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
                    <g
                      id="Layer_1"
                      transform="translate(-4, -4)"
                      style="enable-background: new 0 0 32 32"
                    >
                      <g id="Favorites_1_">
                        <path
                          d="M28, 11C28, 7.1 25.1, 4 21.5, 4C19.1, 4 17.1, 5.4 16, 7.4C14.9, 5.4 12.8, 4 10.5, 4C6.9, 4 4, 7.1 4, 11C4, 11 4, 11.2 4, 11.2C4, 16.1 8.1, 20.2 14.3, 26.3L16, 28L17.7, 26.3C23.9, 20.2 28, 16.1 28, 11.2C28, 11.2 28, 11 28, 11z"
                          @click.prevent="like"
                          stroke="white"
                          stroke-width="2px"
                          fill-opacity="50%"
                          class="Yellow"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div class="img-container">
        <img :src="`${imgForDisplay}`" />
      </div>

      <div class="name-price flex">
        <div>{{ space.name }}</div>
        <div>{{ priceToShow }} / night</div>
      </div>
      <div>200 Kilometers away</div>
      <!-- <div class="like" @click="like"></div> -->

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
      isLiked:false,

    };
  },
  methods: {
    like() {
      // this.$emit("liked", this.space._id);
      this.isLiked = !this.isLiked
      this.svgcolor()
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
    svgcolor(){
     return{
fill : (this.isLiked)? 'red': 'black'
     }  
    },
    imgForDisplay() {
      return this.space.imgUrls[this.picIdx];
    },
    imgsForDisplay() {
      return this.space.imgUrls;
    },
    priceToShow() {
      return this.space.price.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>


<!--
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
-->

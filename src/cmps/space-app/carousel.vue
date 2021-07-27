<template>
    <div class="carousel"  @keydown="checkSlide($event)" tabindex="0">


        <slot></slot>
              <div class="buttons">
        <button @click.prevent="prev">
          <!-- <i class="el-icon-arrow-left"></i> -->
                ◁
                <!-- <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m10.8 16c-.4 0-.7-.1-.9-.4l-6.8-6.7c-.5-.5-.5-1.3 0-1.8l6.8-6.7c.5-.5 1.2-.5 1.7 0s .5 1.2 0 1.7l-5.8 5.9 5.8 5.9c.5.5.5 1.2 0 1.7-.2.3-.5.4-.8.4"></path></svg> -->
        </button>
        <button @click.prevent="next">
          <!-- <i class="el-icon-arrow-right"></i> -->



<svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m5.3 16c .3 0 .6-.1.8-.4l6.8-6.7c.5-.5.5-1.3 0-1.8l-6.8-6.7c-.5-.5-1.2-.5-1.7 0s-.5 1.2 0 1.7l5.8 5.9-5.8 5.9c-.5.5-.5 1.2 0 1.7.2.3.5.4.9.4"></path></svg>
          
          
          
          
          
        </button>
      </div>
        <!-- <button @click.prevent="next" class="btn btn-next"><i class="fa fa-angle-right"></i></button>
        <button @click.prevent="prev" class="btn btn-prev"><i class="fa fa-angle-left"></i></button> -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            index : 0,
            slides : [],
            slideDirection: '',
        }
    },
    computed: {
        slidesLength() {
            return this.slides.length;
        }
    },
    mounted(){
        this.slides = this.$children;
        this.slides.map( (slide,index) => {
            slide.index = index;
        });
    },
    methods: {
        next(){
            this.index++;
            if(this.index >= this.slidesLength){
                this.index = 0;
            }
            this.slideDirection = 'slide-right';
        },
        prev(){
            this.index--;
            if(this.index < 0){
                this.index = this.slidesLength - 1;
            }
             this.slideDirection = 'slide-left';
        },
        checkSlide(event){
            if(event.keyCode === 39){
                this.next();
            }else if (event.keyCode === 37){
                this.prev();
            }else {
                return;
            }
        },
    }
}
</script>
<style>
    
</style>
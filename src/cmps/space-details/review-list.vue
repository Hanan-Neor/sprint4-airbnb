<template>
    <ul class="review-list grid" v-if="reviews">
        <li v-for="review in reviews" :key="review._id" class="review-preview-container flex" >
            <review-preview :review="review" />
        
        </li>
    </ul>
</template>



<script>
import reviewPreview from './review-preview.vue'
export default {
    props: ['reviews'], 
  name: 'reviewList',
  methods: {
    },
    components:{
        reviewPreview
    }

}
</script>


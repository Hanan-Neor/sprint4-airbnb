<template> 
<div class="space-details">
    <chat-app />
    <order-form />
    <review-list />
    <space-imgs />

</div>

</template>

<script>
import chatApp from './../cmps/space-details/chat-app.vue'
import orderForm from './../cmps/space-details/order-form.vue'
import reviewList from './../cmps/space-details/review-list.vue'
import spaceImgs from './../cmps/space-details/space-imgs.vue'

export default {
    name: 'space-details',
    components: {
        chatApp,
        orderForm,
        reviewList,
        spaceImgs
    }
};
</script>



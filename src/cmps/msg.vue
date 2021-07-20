<template>
  <div class="msg">
    <p>{{ getMsg }} people are viewing this space</p>
  </div>
</template>

<script>
import { socketService } from '../services/socket.service';
export default {
    props:['spaceId'],
    created(){
        // socketService.emit("spaceView", this.spaceId);
        socketService.on("viewingSpace", this.showViewMsg);
        //TODO add listener for removing a booked space
        socketService.on("bookedSpace", this.showBookedMsg);
        socketService.on("spaceReviewRemoved", this.removeSpaceView)
    },
    data(){
        return {
        msg:0,
        viewerCount: 0

        }
    },
    methods:{
        showViewMsg(count){
            this.msg=count
        },
        showBookedMsg(){
            console.log('showBookedMsg...');
        },
        removeSpaceView(){
            this.msg -= 1
            console.log('a space view removed', this.msg);
        }
    },
    computed:{
        getMsg(){
            return this.msg
            }
    },
    
    // beforeDestroy(){
    //     socketService.emit("removeSpaceView", this.spaceId);
    // }

}
</script>
<style></style>;

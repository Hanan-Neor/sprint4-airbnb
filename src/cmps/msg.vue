<template>
  <div class="msg">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { socketService } from '../services/socket.service';
export default {
    props:['spaceId', 'msg'],
    created(){
        // socketService.emit("spaceView", this.spaceId);
        socketService.on("updateViewerCount", this.updateMsg);
        // socketService.on("viewingSpace", this.showViewMsg);
        //TODO add listener for removing a booked space
        // socketService.on("bookedSpace", this.showBookedMsg);
        // socketService.on("spaceReviewRemoved", this.removeSpaceView)
    },
    data(){
        return {
        msgD:this.msg,
        viewerCount: 0

        }
    },
    methods:{
        updateMsg(msg){
            console.log('updaing msg in msg', msg);
            this.msgD=msg
        },
        // showBookedMsg(){
        //     console.log('showBookedMsg...');
        // },
        // removeSpaceView(){
        //     this.msg -= 1
        //     console.log('a space view removed', this.msgD);
        // }
    },
    computed:{
        msgC(){
            return this.msgD
            }
    },
    // beforeDestroy() {
    //     socketService.emit('removeViewer', this.$route.params.spaceId);
    // socketService.off('updateViewerCount')
    // },

  //    async beforeDestroy() {
  //   try{
  //     await socketService.emit('removeViewer', this.$route.params.spaceId);
      
  //   console.log('about to leave page', this.getMsg)
  // } catch(err) {
  //   console.log(err);
  //   throw err
  // }
  // },

}
</script>
<style></style>;

<template>
  <div class="msg">
    <p>{{ getMsg }} people are viewing this space</p>
  </div>
</template>

<script>
export default {
    props:['spaceId', 'viewerCount'],
    created(){
        // socketService.emit("spaceView", this.spaceId);
        socketService.on("viewingSpace", this.showViewMsg);
        socketService.on("bookedSpace", this.showBookedMsg);
    },
    data(){
        return {
        msg:'unset',
        viewerCount: 0

        }
    },
    methods:{
        showViewMsg(count){
            this.msg=count
        },
        showBookedMsg(){
            console.log('showBookedMsg...');
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

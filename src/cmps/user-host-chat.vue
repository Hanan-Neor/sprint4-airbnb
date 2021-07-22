<template>
  <div class="user-host-chat">

      <input type="text" v-model="msg">
  </div>
</template>

<script>
export default {
    props:[loggedInUser],
    data(){
        return {
            msg
        }
    },
    created(){
        var socket = io.connect('http://localhost');
        socket.emit('joinChat', {user: this.loggedInUser._id});
        socket.on("new_msg", showMsg);
        },
    methods:{
        showMsg(msg){
            alert(msg)
        }
    },
    async destroyed() {
    try{
      await socketService.emit('removeViewer', this.$route.params.spaceId);
      
    console.log('about to leave page', this.getMsg)
  } catch(err) {
    console.log(err);
    throw err
  }
    }

}
</script>

<style>
</style>
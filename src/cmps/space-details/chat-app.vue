
<template>
<!-- TODO this is copied from space up - need to update later -->
<section class="chat-app">
   <button class="btn-open" @click=openChat >&lt; </button>
  <div class="chat-main"  v-bind:class="{ 'closed': chatClosed, 'open': chatOpen }">
     <button v-if="chatOpen" @click="closeChat" class="btn-close">&gt;</button>
    <div class="chat-body" >
    <p class="chat-title">Message the Host</p>


    
    <ul class="chat-msgs">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}: </span>{{ msg.txt }}
      </li>
    </ul>
    <p v-if="getTyper">{{ getTyper }} is typing...</p>
    <form @submit.prevent="sendMsg">
      <input
        @input="showTypingMsg"
        type="text"
        v-model="msg.txt"
        placeholder="Your msg"
      />
      <!-- <button>Send</button> -->
     
    </form>
    </div>
   
  </div>
  </section>
</template>

<script>
import { socketService } from './../../services/socket.service.js';
export default {
  name: "chat-room",
  props: ['space'],
  created() {
    // socketService.emit("chat topic", this.topic); //TODO possibly remove because this is also in the parent
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("show-typer", this.setTyper);
    this.username = this.$store.getters.loggedinUser.fullname;
    this.msg.from = this.username;
    this.msgs = this.space.msgs || []
  },
  data() {
    return {
      msg: {},
      msgs: [],
      topic: this.space._id,
      username: "",
      typer: "",
      isOpen: false,
    };
  },
  computed: {
    getTyper() {
      return this.typer;
    },
    chatStatus(){
      return this.isOpen ? 'open' : 'closed'
    },
    chatOpen(){return this.isOpen},
  chatClosed(){
    // debugger;
    return !this.isOpen},
  },
  methods: {
    setTyper(typer) {
      this.typer = typer;
    },
    openChat(){
      this.isOpen = true
    },
    closeChat(){
      this.isOpen = false
    },
    async addMsg(msg) {
      await socketService.emit("typing", ""); //unsetting the typer
      this.msgs.push(msg);
    },
    async sendMsg() {
      try {
        // TODO: next 2 lines not needed after connecting to backend
          // this.addMsg(this.msg)
          // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
          socketService.emit("chat newMsg", this.msg);
        this.msg = {
          from: this.$store.getters.loggedinUser.fullname,
          txt: "",
        };
} catch (err) {
        console.log("error in sendMsg in chat room", err);
      }
    },
    showTypingMsg() {
      socketService.emit("typing", this.username);
    },
  },
};
</script>

<style>
</style>
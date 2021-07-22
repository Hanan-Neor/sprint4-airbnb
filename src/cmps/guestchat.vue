
<template>
<!-- TODO this is copied from space up - need to update later -->
  <div class="guestchat">
    <p>this is the guestchat</p>
    <ul>
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
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from './../services/socket.service.js';
export default {
  name: "guest-chat",
      props:['spaceId'],

  data() {
    return {
      msg: {
          from:'',
          txt:'',
      },//for sending mgs
      msgs: [], //for storing all messages
    //   spaceId: this.space._id,
    // spaceId: '60f7de0d24f7769814533eb6',
      username: "",
      typer: "",
      socketId: '',
    }
  },
    created() {
    // socketService.emit("chat topic", this.topic); //TODO possibly remove because this is also in the parent
    socketService.on("receive-msg", this.processMsg);
    socketService.on("show-typer", this.setTyper);
    this.username = this.$store.getters.loggedinUser.fullname;
    console.log(this.msg);
    debugger
    this.msg.from = this.username;
    // this.msgs = this.space.msgs || []
  },
  computed: {
    getTyper() {
      return this.typer;
    },
  },
  methods: {
    setTyper(typer) {
      this.typer = typer;
    },
    async processMsg(msg) {
      await socketService.emit("typing", ""); //unsetting the typer
      this.msgs.push(msg);
    },
    async sendMsg() {
      try {
        // TODO: next 2 lines not needed after connecting to backend
          // this.processMsg(this.msg)
          // setTimeout(()=>this.processMsg({from: 'Dummy', txt: 'Yey'}), 2000)
          socketService.emit("send-msg", this.msg);
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
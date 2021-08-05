<template>
  <div class="login popup-form">
    <!-- <p>{{ msg }}</p> -->

      
      <div @click="closeLogin" class="close pointer">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
      </div>
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <div class="title">

      </div>
      <h4>{{title}}</h4>
      <h2>Welcome to Airbnb</h2>
      <form @submit.prevent="doLogin" v-if="isLoginForm">
<div class="input-container" @click.prevent="userClicked" style="">
        <div class="input-label" :class="{focused:isUserFocused}">Username</div>
        <input v-show="isUserFocused"  class="text-input" type="text" placeholder="username" v-model="loginCred.username">
</div>

        <input class="text-input" type="text" v-model="loginCred.password" placeholder="" />
        <!-- <button>Login</button> -->
      <gradient-btn v-if="!booked" :text="'Login'"></gradient-btn>

      </form>
      <form @submit.prevent="doSignup" v-else>
        <input
        class="text-input"
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        />
        <input
        class="text-input"
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
        class="text-input"
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <!-- <input
          type="text"
          v-model="signupCred.isHost"
          placeholder="Do you own a property"
        /> -->
        <!-- <button>Signup</button> -->
      <gradient-btn v-if="!booked" :text="'Signup'"></gradient-btn>

      </form>

<div @click="toggleFormType" class="form-toggle pointer">
      <p v-if="isLoginForm" >show Signup</p>
      <p v-else >show Login</p>

</div>

    </div>
    <hr />
  </div>
</template>

<script>
import gradientBtn from '../gradient-btn.vue';

export default {
  name: "test",
  props: ['formType'],
  data() {
    return {
      isUserFocused:false,
      msg: "",
      loginCred: { username: "", password: "" },
      // signupCred: { username: "", password: "", fullname: "" },
       signupCred: { username: "", password: "", fullname: ""},
      loginForm: '',
      title: '',
    };
  },
  computed: {
    getTitle(){return this.title},
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isLoginForm(){ return this.loginForm}
  },
  created() {
    // this.loadUsers();
    console.log('here',this.formType);
    this.loginForm = this.formType === 'login'
  },
  methods: {
    userClicked(){
        this.isUserFocused = true
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$emit('close-login');
        // if (this.$router.path !=='/space') this.$router.push("/space");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
      toggleFormType(){
        this.loginForm = !this.loginForm
        this.title= this.formType === 'login' ? 'Signup' : 'Login'
        },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$emit('close-login')
      // if (this.$router.path !=='/space') this.$router.push("/space");
    },
    closeLogin(){
      this.$emit('close-login')
    }
  },
  components:{
    gradientBtn
  }
};
</script>
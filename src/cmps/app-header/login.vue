<template>
  <div class="login popup-form">
    <!-- <p>{{ msg }}</p> -->
    <div @click="closeLogin" class="close pointer">
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
          display: block;
          fill: none;
          height: 16px;
          width: 16px;
          stroke: currentcolor;
          stroke-width: 3;
          overflow: visible;
        "
      >
        <path d="m6 6 20 20"></path>
        <path d="m26 6-20 20"></path>
      </svg>
    </div>
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <!-- <div class="title"></div>
      <h4>{{ title }}</h4> -->
      <h2 style="margin-bottom:25px">Welcome to Airbnb</h2>

      <!-- <form @submit.prevent="doLogin" v-if="isLoginForm"> -->
      <form style="display:flex;flex-direction:column;gap:1rem;" @submit.prevent="doLogin" v-show="isLoginForm">


        <!-- <login-input>
           <label slot="label" class="label">Username</label>
          <input slot="input" v-show="isUserFocused||loginCred.username" class="text-input" type="text" placeholder="Username" v-model="loginCred.username"/> 
        </login-input> -->

        <div class="input-container username" @click.prevent="userClicked" :class="{  filled: loginCred.username ,focused: isUserFocused, }"  >
          <div class="label-container">
            <label class="label" :class="{ focused: isUserFocused || loginCred.username}">Username</label>
          </div>
          <input v-show="isUserFocused||loginCred.username" class="text-input" type="text" placeholder="Username" v-model="loginCred.username"/>
        </div>

        <div class="input-container password" @click.prevent="passwordClicked" :class="{ filled: loginCred.password ,focused: isPasswordFocused }" style="" >
          <div class="label-container">
            <label class="label" :class="{ focused: isPasswordFocused|| loginCred.password }" >Password</label >
          </div>
          <input v-show="isPasswordFocused|| loginCred.password" class="text-input" type="password" placeholder="Password" v-model="loginCred.password"/>
        </div>

        <!-- <input
          class="text-input"
          type="text"
          v-model="loginCred.password"
          placeholder=""
        /> -->
        <!-- <button>Login</button> -->
        <gradient-btn :text="'Login'"></gradient-btn>
      </form>

<!-- ==============================================================   SIGNUP  ===================================================== -->

      <!-- <form style="display:flex;flex-direction:column;gap:1rem;" @submit.prevent="doSignup" v-else> -->
      <form style="display:flex;flex-direction:column;gap:1rem;" @submit.prevent="doSignup" v-show="!isLoginForm">
        
        <div class="input-container fullname" @click.prevent="fullnameClicked" :class="{  filled: signupCred.fullname ,focused: isFullnameFocused, }"  >
          <div class="label-container">
            <label class="label" :class="{ focused: isFullnameFocused || signupCred.fullname}">Full Name</label>
          </div>
          <input v-show="isFullnameFocused||signupCred.fullname" class="text-input" type="text" placeholder="Full name" v-model="signupCred.fullname"/>
        </div>

        <!-- <input
          class="text-input"
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        /> -->

 <div class="input-container signupUsername" @click.prevent="signupUserClicked" :class="{  filled: signupCred.username ,focused: isSignupUserFocused, }"  >
          <div class="label-container">
            <label class="label" :class="{ focused: isSignupUserFocused || signupCred.username}">Username</label>
          </div>
          <input v-show="isSignupUserFocused||signupCred.username" class="text-input" type="text" placeholder="Username" v-model="signupCred.username"/>
        </div>

        <!-- <input
          class="text-input"
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        /> -->

<div class="input-container signupPassword" @click.prevent="signupPasswordClicked" :class="{ filled: signupCred.password ,focused: isSignupPasswordFocused }" style="" >
          <div class="label-container">
            <label class="label" :class="{ focused: isSignupPasswordFocused|| signupCred.password }" >Password</label >
          </div>
          <input v-show="isSignupPasswordFocused|| signupCred.password" class="text-input" type="text" placeholder="Password" v-model="signupCred.password"/>
        </div>

        <!-- <input
          class="text-input"
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        /> -->




        <!-- <input
          type="text"
          v-model="signupCred.isHost"
          placeholder="Do you own a property"
        /> -->
        <!-- <button>Signup</button> -->
        <gradient-btn  :text="'Signup'"></gradient-btn>
      </form>

      <div @click="toggleFormType" class="form-toggle pointer">
        <p v-if="isLoginForm">show Signup</p>
        <p v-else>show Login</p>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import gradientBtn from "../gradient-btn.vue";
import loginInput from "./login-input.vue"
export default {
  name: "test",
  props: ["formType"],
  data() {
    return {
      isSignupPasswordFocused:false,
      isSignupUserFocused:false,
      isFullnameFocused: false,
      isPasswordFocused: false,
      isUserFocused: false,
      msg: "",
      loginCred: { username: "", password: "" },
      // signupCred: { username: "", password: "", fullname: "" },
      signupCred: { username: "", password: "", fullname: "" },
      loginForm: "",
      title: "",
    };
  },
  computed: {
    getTitle() {
      return this.title;
    },
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isLoginForm() {
      return this.loginForm;
    },
  },
  created() {
    // this.loadUsers();
    console.log("here", this.formType);
    this.loginForm = this.formType === "login";
  },
  methods: {



    close(e) {
      if (
        !document.querySelector(".input-container.username").contains(e.target)
        // &&!this.loginCred.username
      ) {
        this.isUserFocused = false;
      }
      if (
        !document.querySelector(".input-container.password").contains(e.target)
        // && !this.loginCred.password
      ) {
        this.isPasswordFocused = false;
      }
      if (
        !document.querySelector(".input-container.fullname").contains(e.target)
        // && !this.loginCred.password
      ) {
        this.isFullnameFocused = false;
      }
      if (
        !document.querySelector(".input-container.signupUsername").contains(e.target)
        // && !this.loginCred.password
      ) {
        this.isSignupUserFocused = false;
      }
      if (
        !document.querySelector(".input-container.signupPassword").contains(e.target)
        // && !this.loginCred.password
      ) {
        this.isSignupPasswordFocused = false;
      }
    },



    userClicked() {
      this.isUserFocused = true;
      setTimeout(()=>{
        document.querySelector('.input-container.username input').focus()
      },100)
    },
    passwordClicked() {
      this.isPasswordFocused = true;
            setTimeout(()=>{
        document.querySelector('.input-container.password input').focus()
      },100)
    },
    fullnameClicked(){
      this.isFullnameFocused = true;
            setTimeout(()=>{
        document.querySelector('.input-container.fullname input').focus()
      },100)
    },
    signupUserClicked(){
      this.isSignupUserFocused = true;
            setTimeout(()=>{
        document.querySelector('.input-container.signupUsername input').focus()
      },100)
    },
    signupPasswordClicked(){
      this.isSignupPasswordFocused= true;
            setTimeout(()=>{
        document.querySelector('.input-container.signupPassword input').focus()
      },100)
    },


    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$emit("close-login");
        // if (this.$router.path !=='/space') this.$router.push("/space");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    toggleFormType() {
      this.loginForm = !this.loginForm;
      this.title = this.formType === "login" ? "Signup" : "Login";
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
      this.$emit("close-login");
      // if (this.$router.path !=='/space') this.$router.push("/space");
    },
    closeLogin() {
      this.$emit("close-login");
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
    eventBusService.$on("buttonClicked", (type) => {
      console.log(type);
      this.clicked(type);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },

  components: {
    gradientBtn,
    loginInput
  },
};
</script>
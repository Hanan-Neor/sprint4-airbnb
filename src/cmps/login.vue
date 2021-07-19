<template>
  <div class="login popup-form">
    <!-- <p>{{ msg }}</p> -->

      
      <p @click="closeLogin" class="close pointer">x</p>
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

        <input class="text-input" type="text" placeholder="username" v-model="loginCred.username">

        <input class="text-input" type="text" v-model="loginCred.password" placeholder="User name" />
        <button>Login</button>
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
        <button>Signup</button>
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
export default {
  name: "test",
  props: ['formType'],
  data() {
    return {
      msg: "",
      loginCred: { username: "user1", password: "123" },
      signupCred: { username: "", password: "", fullname: "" },
      loginForm: '',
      title: ''
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
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$emit('close-login');
        if (this.$router.path !=='/space') this.$router.push("/space");
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
      if (this.$router.path !=='/space') this.$router.push("/space");
    },
    closeLogin(){
      this.$emit('close-login')
    }
  },
};
</script>
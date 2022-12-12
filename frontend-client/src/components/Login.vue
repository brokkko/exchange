<template>
  <div class="container">
    <div class="info">
      <span class="text title">TRADING</span>
      <span class="text">Welcome back! Login to your account.</span>
    </div>
    <div class="login-form">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <div class="buttons text">
        <button id="not-selected" v-on:click="routeToSignUp">Sign Up</button>
        <button id="selected" v-on:click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    axiosUserParams(email, password) {
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);
      return params;
    },

    login() {
      if(this.email !== "" && this.password !== "") {
        console.log(this.axiosUserParams(this.email, this.password))
        axios.get('http://localhost:3000/brokers/auth', {
          params: {email: this.email, password: this.password}
        })
          .then(response => {
            if(response.data !== "") return response.data;
          }).then(json => {
            if(JSON.stringify(json) !== undefined){
              localStorage.setItem("user-info", JSON.stringify(json));
              this.$router.push({name: "home"});
            }

        });
      }
    },
    routeToSignUp(){
      this.$router.push({name: "signup"});
    }
  },
}
</script>

<style scoped>
.container{
  background: var(--section-background-color);
  width: 35vw;
  height: 85vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--text-color);
}
.info{
  display: flex;
  gap: 26px;
  flex-direction: column;
  margin-top: 20%;
  margin-bottom: 10px;
}
.text{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  /* identical to box height */
  color: var(--text-color);
}

.title {
  font-size: 3rem;
  font-weight: 800;
}

.login-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.login-form input{
  width: 300px;
  height: 40px;
  border: none;
  border-bottom: 2px solid var(--text-color);
  background: var(--section-background-color);

  font-size: 17px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  color: var(--text-color);
}

.login-form input:focus{
  outline:none;
  border-bottom: 2px solid var(--text-color);
}

.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons button{
  width: 40%;
  border: 2px solid var(--button-blue-selected-color);
  border-radius: 10px;
  margin-top: 40px;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;

  color: var(--text-color);
}
.buttons #selected{
  background: var(--button-blue-selected-color);
}
.buttons #not-selected{
  background: var(--section-background-color);
}
</style>
<template>
  <div class="signup-page">
    <div class="container">
      <div class="info">
        <span class="text title">TRADING</span>
        <span class="text">Welcome! Create your new account.</span>
      </div>
      <div class="login-form">
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="surname" placeholder="Surname">
        <input type="email" v-model="email" placeholder="Email">
        <input type="password" v-model="password1" placeholder="Password">
        <input type="password" v-model="password2" placeholder="Password">
        <div class="buttons text">
          <button id="selected" v-on:click="signUp">Sign Up</button>
          <button id="not-selected" v-on:click="routeToLogin">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserDTO from "../core/dto/UserDTO.js";
export default {
  name: "SignUp",
  data(){
    return{
      name: '',
      surname: '',
      email: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    signUp() {
     if(this.name !== '' && this.surname !== '' && this.email !== '' && this.password1 !== '' && this.password1 === this.password2){
        console.log("signed up")
        let user = new UserDTO("", this.name, this.surname, this.email, this.password1, 0, 1, []);
        axios.post('http://localhost:3000/brokers', user)
            .then(response => {
              if(response) return response.data;
            }).then(json => {
              localStorage.setItem("user-info", JSON.stringify(json));
              this.$router.push({name: "home"});
            });

      }
    },
    routeToLogin() {
      this.$router.push({name: "login"});
    }
  },
}
</script>

<style scoped>
.signup-page{
  display: flex;
  height: 100%;
  width: 100vw;
  align-items: center;
  justify-content: center;
}
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
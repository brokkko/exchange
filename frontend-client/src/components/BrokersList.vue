<template>
  <div class="brokers-page">
    <div class="brokers-list">
      <p class="title">BROKERS LIST</p>
      <div class="description">
        <p class="text">Firstname</p>
        <p class="text">Lastname</p>
        <p></p>
        <p class="text">Founds</p>
      </div>
      <div v-for="(item, index) in this.brokers">
        <div class="description description-border" v-on:click="selectBrokerOnClick(item)">
          <p class="text fullName">{{ item.firstname }}</p>
          <p class="text fullName">{{ item.lastname }}</p>
          <p></p>
          <p class="text fullName">{{ this.round(item.founds) }}</p>
        </div>
      </div>
    </div>
    <div class="broker-details">
      <BrokerDetails v-bind:broker="selectedBroker"></BrokerDetails>
    </div>
  </div>
</template>
<script>
import BrokerDetails from "./BrokerDetails.vue";
import axios from "axios";
export default {
  name: "BrokersList",
  components: {BrokerDetails},
  data(){
    return{
      brokers: [],
      selectedBroker: null
    }
  },
  methods: {
    selectBrokerOnClick(broker) {
      this.selectedBroker = broker;
    },
    round(value) {
      return Math.round(100 * value) / 100;
    },
  },
  mounted(){
    let user = localStorage.getItem('user-info');
    if(!user){
      this.$router.push({name: "signup"});
    } else{
      axios.get('http://localhost:3000/brokers')
        .then(response => {
          if(response.data !== "") return response.data;
        }).then(json => {
          if(JSON.stringify(json) !== undefined){
            console.log(json);
          this.brokers = json;
        }

      });
    }
  }
}
</script>

<style scoped>
.brokers-page{
  display: flex;
  height: 100%;
  width: 100vw;
  margin-left: 20px;
  /*background: red;*/
}
.brokers-list{
  background: var(--section-background-color);
  width: 30%;
  height: 97%;
  color: var(--title-color);
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 21px;
  /* identical to box height */

  color: var(--text-color);
  margin-left: 20px;
}
.text{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  /* identical to box height */

  color: #6D6D74;
}
.fullName{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  /* identical to box height */
  color: var(--text-color);
}
.description{
  display: grid;
  justify-items: start;
  grid-template-columns: 8vw 10vw 4vw 6vw ;
  margin-left: 20px;
}
.description-border{
  border-top: 2px solid #b9b8b8;
}
/*.description-border:hover {*/
/*  -webkit-transform: scale(1.05);*/
/*  -ms-transform: scale(1.05);*/
/*  transform: scale(1.05);*/
/*}*/

.broker-details{
  background: var(--section-background-color);
  border-radius: 5px;
  width: 65%;
  height: 97%;
  color: var(--title-color);
  margin-top: 10px;
  margin-left: 15px;
 }
</style>

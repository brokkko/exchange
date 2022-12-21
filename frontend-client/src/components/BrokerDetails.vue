<template>
  <div v-if="broker">
    <div class="main-info">
      <p class="text fullName">{{ broker.firstname }}</p>
      <p class="text fullName">{{ broker.lastname }}</p>
      <p></p>
      <p class="text fullName">{{ broker.founds }} USD</p>
    </div>
    <div class="list-of-stocks">
      <div class="wallet-list">
        <!--        <Wallet v-bind:stocks="broker.stocks"></Wallet>-->
        <div>
          <span class="grey-title">WALLET</span>
        </div>
        <div class="description">
          <p class="text">Stocks</p>
          <p></p>
          <p class="text">Last</p>
          <p class="text">Number</p>
          <p class="text">Founds</p>
          <p class="text">Profit</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="padding text">Select broker to see details information</p>
  </div>

</template>

<script>
export default {
  name: "BrokerDetails",
  props: ['broker'],
  methods: {
    round(value) {
      return Math.round(100 * value) / 100;
    },
  }
}
</script>

<style scoped>
.text{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  /* identical to box height */

  color: #6D6D74;
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
.padding{
  display: flex;
  justify-content: center;
  margin-top: 20%;
  font-size: 20px;
  font-weight: 400;
}

.main-info{
  display: grid;
  justify-items: start;
  grid-template-columns: 10vw 10vw 5vw 7vw ;
  margin-left: 20px;
}

.fullName{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  /* identical to box height */
  color: var(--text-color);
}

</style>
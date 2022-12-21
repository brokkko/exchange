<template>
  <div class="trading-list">
    <div>
      <span class="grey-title">TRADING</span>
    </div>
    <div class="waiting-for-trading" v-if="date===null">
      <span class="text-title">Please, wait for the trading start.</span>
    </div>
    <div v-else>
      <div class="trading-date">
        <span>Trading start: </span>
        <span class="">{{new Date(startDate).toLocaleDateString("en-US", dateOptions)}}</span>
      </div>
      <div class="trading-date">
        <span>Current date: </span>
        <span class="">{{new Date(date).toLocaleDateString("en-US", dateOptions)}}</span>
      </div>
      <div class="description">
        <p class="text">Symbol</p>
        <p></p>
        <p class="text">Last</p>
        <p class="text">Change</p>
      </div>
      <div class="trading-stocks" v-for="value in stocks">
        <div class="description description-border" v-on:click="onSelectStock(value)">
          <p class="text symbol">{{ value.ticker }}</p>
          <p class="text fullName">{{ value.name }}</p>
          <p class="text fullName">{{ value.last }}</p>
          <p v-bind:class="(this.round(value.open - value.last) > 0 ? 'text green-color' : 'text red-color')">
          {{this.round(value.open - value.last) > 0 ? ("+ " + this.round(value.open - value.last)) : "- " + Math.abs(this.round(value.open - value.last))}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trading",
  props: ['clicked', 'date', 'stocks', 'startDate'],
  data(){
    return{
      dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    }
  },
  methods: {
    round(value) {
      return Math.round(100 * value) / 100;
    },
    onSelectStock (stock) {
      this.$emit('clicked', stock);
    },

  },

}
</script>

<style scoped>
.trading-list{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: var(--section-background-color);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
}
.grey-title{
  color: var(--title-grey-color);
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
  margin-left: 20px;
  margin-top: 30px;
}
.waiting-for-trading{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 60px;


}

.trading-date{
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 400;
  gap: 20px;
  color: var(--title-grey-color);
}

.text-title{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  /* identical to box height */
  color: var(--title-grey-color);
}


.text{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  /* identical to box height */

  color: #6D6D74;
}
.description{
  display: grid;
  justify-items: start;
  grid-template-columns: 5vw 17vw 7vw 4vw ;
  margin-left: 20px;
}
.description-border{
  border-top: 2px solid #35353F;
}
.description-border:hover{
  background: var(--hover-color);
}

.symbol {
  width: 55px;
  background: var(--selector-background-color);
  border-radius: 5px;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  /* identical to box height */
  color: var(--text-color);
}
.fullName{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  /* identical to box height */
  color: var(--text-color);
}
.green-color{
  color: var(--green-color);
}
.red-color{
  color: var(--red-color);
}

</style>
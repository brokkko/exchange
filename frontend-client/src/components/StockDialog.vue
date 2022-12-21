<template>
  <div class="dialog">
    <div class="stock-name text">
      <span class="stock-name text">{{stock.name}}</span>
    </div>
    <span  class="stock-name big-size text">$ {{stock.last}}</span>
    <span v-bind:class="(this.round(stock.open - stock.last) > 0 ? 'text green-color' : 'text red-color')">
      {{this.round(stock.open - stock.last) > 0 ? ("+ " + this.round(stock.open - stock.last)) : "- " + Math.abs(this.round(stock.open - stock.last))}} $
    </span>

    <div class="navigation">
      <button v-bind:class="(page==='buy') ? 'nav-button nuv-selected-button' : 'nav-button'" v-on:click="page='buy'">Buy</button>
      <button v-bind:class="(page==='sell') ? 'nav-button nuv-selected-button' : 'nav-button'" v-on:click="page='sell'">Sell</button>
      <button v-bind:class="(page==='progress') ? 'nav-button nuv-selected-button' : 'nav-button'" v-on:click="page='progress'">Progress</button>
    </div>


    <div class="buy-section" v-if="page==='buy'">
      <span class="stock-name text mid-size">Number of shares</span>
      <div class="progress-sum">
        <span class="stock-name big-size-2 text green-color">{{this.progress}}</span>
        <span class="mid-size text grey-color">$ {{round(this.progress*stock.last)}}</span>
      </div>
      <input
          ref="scrubber"
          type="range"
          min="0"
          max="10"
          step="1"
          :value="this.progress"
          @input="adjustHealth"
      />
      <span class="text grey-color">Available 10 shares max</span>
      <span class="stock-name text">Your available funds: $ {{round(broker.founds)}}</span>
      <div class="buttons-section">
        <button class="buy-button" v-on:click="this.$emit('buy', this.progress)">Buy</button>
        <button class="exit-button" v-on:click="this.$emit('close');">Cancel</button>
      </div>
    </div>


    <div class="sell-section" v-else-if="page==='sell'">
      <span class="stock-name text mid-size">Number of shares</span>
      <div class="progress-sum">
        <span class="stock-name big-size-2 text green-color">{{this.sell_progress}}</span>
        <span class="mid-size text grey-color">$ {{round(this.sell_progress*stock.last)}}</span>
      </div>
      <input
          ref="scrubber"
          type="range"
          min="0"
          max="10"
          step="1"
          :value="this.sell_progress"
          @input="changeSellProgress"
      />
      <span class="text grey-color">Available 10 shares max</span>
      <span class="stock-name text">Your available number of selected stock: {{broker.stocks.filter(elem => elem.ticker === stock.ticker).length}}</span>
      <div class="buttons-section">
        <button class="buy-button" v-on:click="this.$emit('sell', this.sell_progress)">Sell</button>
        <button class="exit-button" v-on:click="this.$emit('close');">Cancel</button>
      </div>
    </div>


    <div class="graphics" v-else-if="page==='progress'">
      <BarChart v-bind:hist="hist"/>
    </div>

  </div>


</template>

<script>
import BarChart from "./BarChart.vue";
export default {
  name: "StockDialog",
  components: {BarChart},
  props: ['stock', 'broker', 'hist', 'close', 'buy', 'sell'],
  data(){
    return{
      progress: 0,
      sell_progress: 0,
      page: 'buy'
    }
  },
  methods: {
    adjustHealth (ev) {
      this.progress = ev.target.value
    },
    changeSellProgress (ev) {
      this.sell_progress = ev.target.value
    },
    round(value) {
      return Math.round(100 * value) / 100;
    },

  }
}
</script>

<style scoped>
.dialog{
  width: 46vw;
  height: 92vh;
  background: var(--hover-color);
  position: fixed;
  left: calc(50% - 23vw);
  top: calc(100% - 46vw);
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  padding-top: 35px;
  gap: 20px;
}
.stock-name{
  color: var(--text-color);
  font-size: 25px;
}
.big-size{
  font-size: 40px;
}
.big-size-2{
  font-size: 60px;
}
.mid-size{
  font-size: 20px;
}
.text{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
}
.nav-button{
  background: var(--hover-color);
  all: unset;
  width: 100px;
  color: var(--text-color);
  margin: 10px 15px 0;
}
.nuv-selected-button{
  border-bottom: 2px solid var(--button-blue-selected-color);
  color: var(--button-blue-selected-color);
}
.buy-button{
  background: var(--green-color);
  border-radius: 5px;
  border: 2px solid var(--green-color);
  width: 50%;
  color: var(--text-color);
  font-weight: 600;
}
.exit-button{
  background: var(--hover-color);
  border-radius: 5px;
  border: 2px solid var(--green-color);
  width: 50%;
  color: var(--text-color);
  font-weight: 600;
}

input[type='range'] {
  -webkit-appearance: none;
  background-color: var(--input-not-selected-range);

  width: 80%;
  border-radius: 20px;
  height: 10px;
  outline: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 22px;
  width: 22px;
  border-radius: 50px;
  background:var(--input-selected-range);
  cursor: pointer;
  outline: none;
}


.green-color{
  color: var(--green-color);
}
.red-color{
  color: var(--red-color);
}
.grey-color{
  color: var(--title-grey-color);
}

.buy-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
}
.buttons-section{
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 80%;
  gap: 20px;
  margin-top: 80px;
}
.progress-sum{
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
}

.sell-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
}

.graphics{
  display: flex;
  width: 95%;
  justify-content: flex-end;
  margin-top: 20px;
}

</style>
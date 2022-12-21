<template>
  <div v-bind:class="(!showStockDialog)?'broker-account' : 'broker-account blur'">
      <div class="header">
        <div class="header-grid">
          <div class="info fullName header-title">
            <p>{{broker.firstname}}</p>
            <p>{{broker.lastname}}</p>
          </div>
          <p class="fullName header-title">  $ {{this.round(broker.founds)}}</p>
          <p></p>
<!--          <button class="admin-button" v-on:click="admitModeHandleClick"></button>-->
        </div>
      </div>

    <div class="content">
      <div class="trading-list">
        <Trading @clicked="onSelectStockFromChild" v-bind:date="tradingDate" v-bind:startDate="startTradingDate" v-bind:stocks="tradingStocks"></Trading>
      </div>
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
<!--          <p class="text">Profit</p>-->
        </div>
        <div class="trading-stocks" v-for="value in [...broker.stocks.reduce((map, obj) => map.has(obj.ticker) ? map : map.set(obj.ticker, obj), new Map()).values()]">
          <div class="description description-border">
            <p class="text symbol">{{ value.ticker }}</p>
            <p class="text fullName">{{ value.name }}</p>
            <p class="text fullName">{{ value.last }}</p>
            <p class="text fullName">{{ broker.stocks.filter(elem => elem.ticker === value.ticker).length }}</p>
            <p class="text fullName">$ {{ this.round(broker.stocks.filter(elem => elem.ticker === value.ticker).length * value.last) }}</p>
            <p class="text fullName" v-if="this.tradingDate === null"></p>
<!--            <p v-else>-->
<!--              {{this.round(tradingStocks.filter(elem => elem.ticker === value.ticker)[0].last* broker.stocks.filter(elem => elem.ticker === value.ticker).length -  broker.stocks.filter(elem => elem.ticker === value.ticker).length * value.last)}}</p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showStockDialog === true">
    <StockDialog
        v-bind:stock="selectedStock"
        v-bind:broker="broker"
        v-bind:hist="selectedHistoricalData"
        @close="closeDialog"
        @buy="buyStocks($event)"
        @sell="sellStocks($event)">
    </StockDialog>
  </div>
</template>

<script>
import Wallet from "./Wallet.vue";
import Trading from "./Trading.vue";
import SocketIoService from "../services/socketio.service.js";
import StockDialog from "./StockDialog.vue";
import axios from "axios";
export default {
  name: "BrokerAccount",
  components: {StockDialog, Trading, Wallet},
  data(){
    return{
      broker: null,
      tradingDate: null,
      tradingStocks: [],
      selectedStock: null,
      startTradingDate: null,
      showStockDialog: false,
      socketConnection: undefined,
      selectedHistoricalData: []
    }
  },
  methods: {
    getBrokerById(){
      let currentBroker = JSON.parse(localStorage.getItem('user-info'));
      axios.get('http://localhost:3000/brokers/' + currentBroker.id)
          .then(response => {
            if(response) return response.data;
          }).then(json => {
        console.log(json)
        localStorage.setItem("user-info", JSON.stringify(json));
        this.broker = json;
      });
    },
    round(value) {
      return Math.round(100 * value) / 100;
    },
    onSelectStockFromChild (value) {
      this.selectedStock = value;
      this.showStockDialog = true;

      // go
      console.log(this.selectedStock.ticker);
      this.socketConnection.socket.emit('start-sending-hist', this.selectedStock.ticker);
      this.socketConnection.socket.on('sending-hist', (data) => {
        this.selectedHistoricalData = this.modifyData(JSON.parse(data));
      })

    },
    closeDialog(){
      this.showStockDialog = false;
      this.socketConnection.socket.emit('stop-sending-hist');
    },
    monthDiff(d1, d2){
      let months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    },
    modifyData(hist){
      let currentDate = new Date();
      return hist.filter(elem => {
        return this.monthDiff(new Date(elem.Date), currentDate) <= 1;
      });
    },

    buyStocks(number){
      if(this.broker.founds >= this.selectedStock.last * number) {
        for(let i=0; i<number; i++) {
          this.broker.stocks.push(this.selectedStock);
        }
        this.broker.founds -= this.selectedStock.last * number;
        console.log(this.broker.founds)
        axios.put('http://localhost:3000/brokers/' + this.broker.id, this.broker)
            .then(response => {
              if(response) return response.data;
            }).then(json => {
              console.log(json)
              localStorage.setItem("user-info", JSON.stringify(json));
              this.closeDialog();
              this.selectedStock = null;
        });
      }

    },
    sellStocks(number){
      let stocksList = this.broker.stocks.filter(elem => elem.ticker === this.selectedStock.ticker);
      if(stocksList.length >= number) {
        stocksList = stocksList.slice(0, number);
        stocksList.forEach(elem => {
          let index = this.broker.stocks.indexOf(elem);
          if(index !== -1) {
            this.broker.stocks.splice(index, 1);
          }
        })

        this.broker.founds += this.selectedStock.last * number;
        console.log("UPDATED BROKER");
        console.log(this.broker)

        axios.put('http://localhost:3000/brokers/' + this.broker.id, this.broker)
            .then(response => {
              if(response) return response.data;
            }).then(json => {
              console.log(json)
              localStorage.setItem("user-info", JSON.stringify(json));
              this.closeDialog();
        });
      }
    },
    admitModeHandleClick() {
      this.$router.push({name: "info"});
    }


  },
  mounted(){
  },
  created() {
    this.getBrokerById();
    this.socketConnection = new SocketIoService();
    this.socketConnection.setupSocketConnection();
    this.socketConnection.socket.on('trading', (data) => {
      console.log("START TRADING")
      console.log(data)
      if(this.startTradingDate === null) {
        this.startTradingDate = data[0].date;
      }
      this.tradingDate = data[0].date;
      this.tradingStocks = [];
      data.forEach(elem => {
        if(elem.selected === true)
          this.tradingStocks.push(elem);
      });
      localStorage.setItem("trading-info", JSON.stringify(this.tradingStocks));
      localStorage.setItem("trading-date-start", this.startTradingDate);
      localStorage.setItem("trading-date", this.tradingDate);
    });

    this.socketConnection.socket.on('trading-ended', (arg) => {
      localStorage.removeItem("trading-info");
      localStorage.removeItem("trading-date-start");
      localStorage.removeItem("trading-date");
      this.tradingStocks = [];
      this.startTradingDate = null;
      this.tradingDate = null;
      this.closeDialog();
    });

    if(localStorage.getItem("trading-info")) {
      this.tradingStocks = JSON.parse(localStorage.getItem("trading-info"));
      this.startTradingDate = localStorage.getItem("trading-date-start");
      this.tradingDate = localStorage.getItem("trading-date");
    }

  },
  beforeUnmount() {
    this.socketConnection.disconnect();
  }
}
</script>

<style scoped>
.broker-account{
  display: flex;
  height: 100%;
  width: 100vw;
  /*background: red;*/
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.blur{
  filter: blur(5px);
}

.header{
  width: 98vw;
  height: 9%;
  background: var(--section-background-color);
  border-radius: 5px;
  margin-top: 10px;
}
.header-grid{
  display: grid;
  justify-items: start;
  grid-template-columns: 15vw 76vw 10vw;
  margin-left: 20px;
}
.info{
  display: flex;
  gap: 10px;
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

.content{
  width: 98%;
  height: 87%;
  border-radius: 5px;

  display: flex;
  gap: 10px;
}

.trading-list{
  width: 35vw;
  height: 83vh;
}
.wallet-list{
  width: 62vw;
  height: 83vh;
}

.wallet-list{
  width: 80%;
  height: 95%;
  border-radius: 5px;
  background: var(--section-background-color);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;

  color: white;
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

.header-title{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
  margin-left: 20px;
}

.description{
  display: grid;
  justify-items: start;
  grid-template-columns: 5vw 17vw 7vw 7vw 9vw 10vw;
  margin-left: 20px;
}
.description-border{
  border-top: 2px solid #35353F;
}

.admin-button{
  border: none;
  background: url('../assets/admin.svg') no-repeat;
  margin-top: 17px;
}

</style>
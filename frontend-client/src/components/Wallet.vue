<template>
  <div class="wallet-list">
    <div>
      <span class="grey-title">WALLET</span>
    </div>
    {{stocks}}
  </div>

</template>

<script>
export default {
  name: "Wallet",
  props: ['stocks']
}
</script>

<style scoped>
.wallet-list{
  width: 100%;
  height: 100%;
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

</style>
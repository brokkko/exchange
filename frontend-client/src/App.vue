<template>
  <router-view/>
</template>

<script>
import "./assets/styles/main.css";
export default {
  name: 'App',
}
</script>

<style>
body{
  background: var(--root-background-color);
}
#app{
  padding: 0;
  margin: 0;
  /*width: 100vw;*/
  height: 100vh;
}
</style>

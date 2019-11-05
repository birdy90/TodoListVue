<template>
  <div id="app">
    <div class='wrapper'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from './utils/store';
import router from './utils/router';

export default {
  name: 'app',
  store,
  router,
}
</script>


<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrapper {
    border-radius: 5px;
    background-color: #e3e3e3;
    margin-top: 10px;
    width: 400px;
    padding: 10px;
  }

  @media screen and (max-width: 419px) {
    #app {
      align-items: flex-start;
    }

    .wrapper {
      border-radius: 0;
      margin-top: 0;
      min-width: 300px;
      width: 100%;
    }
  }
</style>

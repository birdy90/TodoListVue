<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';

import store from './utils/store';
import router from './utils/router';

export default {
  name: 'app',
  store,
  router,
  components: {
    TaskList
  }
}
</script>

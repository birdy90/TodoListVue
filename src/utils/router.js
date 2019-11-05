import Vue from 'vue';
import VueRouter from 'vue-router';

import TaskList from '../components/TaskList.vue';
import NotFound from '../components/NotFound.vue';
import ListItem from "../components/ListItem";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: TaskList},
    {path: '/page/:page?', component: TaskList},
    {path: '/item/:id', component: ListItem},
    {path: '*', component: NotFound}
  ]
});

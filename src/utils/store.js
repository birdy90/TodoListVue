import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsList: [],
  },
  mutations: {
    addItem: (state, item) => {
      let itemIndex = state.itemsList.findIndex(t => {
        return t.value === item.value;
      });

      if (itemIndex >= 0) {
        alert(`Уже есть такой элемент: ${item.value}`);
        return;
      }

      if (!item.value) return;

      state.itemsList.splice(item.index, 0, {checked: false, value: item.value});
    },

    removeItem: (state, item) => {
      let itemIndex = state.itemsList.indexOf(item);
      state.itemsList.splice(itemIndex, 1);
    },

    toggleItem: (state, item) => {
      let itemIndex = state.itemsList.indexOf(item);
      window.console.log(item);
      window.console.log(itemIndex);
      window.console.log(state.itemsList[itemIndex]);
      state.itemsList[itemIndex].checked = !state.itemsList[itemIndex].checked;
    },

    clearStore: state => state.itemsList = [],
  },
  actions: {
    initItemList: ({ commit }) => {
      commit('clearStore');
      const {data} = require('../assets/data.json');
      data.forEach(item => commit('addItem', {value: item, index: 0}));
    }
  }
});

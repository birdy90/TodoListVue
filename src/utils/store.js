import Vue from 'vue';
import Vuex from 'vuex';
import db from './firebase';

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
      item.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      state.itemsList.splice(item.index, 0, item);
    },

    removeItem: (state, item) => {
      let itemIndex = state.itemsList.indexOf(item);
      if (itemIndex < 0) return;
      state.itemsList.splice(itemIndex, 1);
    },

    updateItem: (state, payload) => {
      let itemIndex = state.itemsList.indexOf(payload.item);
      state.itemsList[itemIndex].value = payload.value;
    },

    toggleItem: (state, item) => {
      let itemIndex = state.itemsList.indexOf(item);
      state.itemsList[itemIndex].checked = !state.itemsList[itemIndex].checked;
    },

    clearStore: state => state.itemsList = [],
  },
  actions: {
    initItemList: ({ commit }) => {
      commit('clearStore');
      db.ref('todo-list')
        .once('value')
        .then(data => {
          let val = data.val();
          for (let item in val) {
            commit('addItem', val[item]);
          }
        });
    }
  }
});

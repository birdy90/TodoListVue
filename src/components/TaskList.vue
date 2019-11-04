<template lang='pug'>
    div
        Pagination(:currentPage='currentPage' :overallPages='overallPages' :setPage='setPage')

        ul.item-list
            li(v-if='currentPage > 1')
                input(placeholder='вставить' ref='item-page-input')
                button(@click='onAddToPage')
            li.item(:class='{checked: item.checked}' v-for='item in currentPageItems' @click='toggleItem(item)') {{item.value}}
                small редактировать
                small(@click.stop='onDelete(item)') удалить

        label(for='item-input') Новый элемент
        textarea#item-input(placeholder='новый элемент' ref='item-input')

        button.add-item(@click='onAdd') Добавить элемент

</template>

<script>
  import Pagination from './Pagination';
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    name: "TaskList",

    data: () => {
      return {
        pageSize: 4,
        currentPage: 1,
      };
    },

    components: {
      Pagination,
    },

    created: function() {
      this.initItemList();
    },

    computed: {
        ...mapState(['itemsList']),
        currentPageItems() {
          let currentPage = Math.max(0, Math.min(this.overallPages, this.currentPage));

          let list = [...this.itemsList];
          return list.splice(this.pageSize * (currentPage - 1), this.pageSize);
        },

        overallPages() {
          return Math.ceil(this.itemsList.length / this.pageSize);
        },
    },

    methods: {
      ...mapMutations([
        'addItem',
        'removeItem',
        'toggleItem',
      ]),
      ...mapActions(['initItemList']),
      onAddToPage() {
        let newItem = this.$refs['item-page-input'];
        this.addItem({value: newItem.value, index: this.pageSize * (this.currentPage - 1)});
        newItem.value = '';
      },
      onAdd() {
        let newItem = this.$refs['item-input'];
        this.addItem({value: newItem.value, index: 0});
        this.currentPage = 1;
        newItem.value = '';
      },
      onDelete(item) {
        this.removeItem(item);
      },
      setPage(page) { this.currentPage = page; },
    },
  }

</script>

<style scoped>
    .item.checked {
        text-decoration: line-through;
    }
</style>

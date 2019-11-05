<template lang='pug'>
    div(v-if='itemsList.length')
        svg(style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink").
            <defs>
            <symbol id="icon-pencil" viewBox="0 0 32 32">
            <title>pencil</title>
            <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
            </symbol>
            <symbol id="icon-cross" viewBox="0 0 32 32">
            <title>cross</title>
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
            </symbol>
            <symbol id="icon-plus" viewBox="0 0 32 32">
            <title>plus</title>
            <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
            </symbol>
            </defs>

        Pagination(:currentPage='currentPage' :overallPages='overallPages' :setPage='setPage')

        h3 Задачи

        ul.item-list
            li.item(v-if='currentPage > 1')
                input.text(placeholder='вставить здесь...' ref='item-page-input')
                .controls
                    .control(@click='onAddToPage')
                        svg
                            use(xlink:href="#icon-plus")
            li.item(:class='{checked: item.checked}' v-for='(item, i) in currentPageItems' :key='item.id')
                span.text(@click='toggleItem(item)' :title='item.value') {{i + (currentPage - 1) * pageSize + 1}}) {{item.value}}
                .controls
                    router-link.control(:to='`/item/${item.id}`')
                        svg
                            use(xlink:href="#icon-pencil")
                    span.control(@click='onDelete(item)')
                        svg
                            use(xlink:href="#icon-cross")

        ul.item-list
            li.item
                input(placeholder='новый элемент в начало...' ref='item-input')

            button.add-item(@click='onAdd') Добавить

    div(v-else)
        | Загружается...

</template>

<script>
  import Pagination from './Pagination';
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    name: "TaskList",

    data: () => {
      return {pageSize: 4,};
    },

    components: {
      Pagination,
    },

    created: function() {
      if (this.itemsList.length === 0) {
        this.initItemList();
      }
    },

    computed: {
        ...mapState(['itemsList']),
        currentPageItems() {
          let list = [...this.itemsList];
          return list.splice(this.pageSize * (this.currentPage - 1), this.pageSize);
        },

        currentPage() {
          let page = this.$route.params.page || 1;
          page = parseInt(page, 10);
          page = Math.max(1, Math.min(this.overallPages, page));
          if (isNaN(page)) {
            let router = this.$router;
            router.push('/404');
          }
          return page;
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
        this.setPage(1);
        newItem.value = '';
      },
      onDelete(item) {
        this.removeItem(item);
      },
      setPage(page) { this.$router.push(`/page/${page}`); },
    },
  }

</script>

<style scoped>
    input, textarea {
        font-size: 0.9em;
        border: none;
    }

    .list-wrapper {
        border-radius: 5px;
        background-color: #e3e3e3;
        width: 400px;
        padding: 10px;
    }

    .item-list {
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .item-list .item {
        background-color: white;
        border-radius: 5px;
        box-shadow: #b4b4b4 0 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        margin: 5px 0;
        padding: 10px;
        white-space: nowrap;
    }

    .item-list .item .text {
        flex-grow: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .item-list .item:hover .controls {
        display: flex;
    }

    .item-list:last-of-type {
        margin-bottom: 0;
    }

    .controls {
        display: flex;
        flex-direction: row;
    }

    .control {
        color: lightgrey;
        cursor: pointer;
        height: 16px;
        text-decoration: none;
        margin-left: 10px;
        width: 16px;
    }

    .control svg {
        fill: lightgrey;
        transition: fill 0.2s;
        height: 100%;
        width: 100%;
    }

    .control:hover svg {
        fill: darkgrey;
    }

    .item.checked span {
        text-decoration: line-through;
    }

    .add-item {
        border: none;
        background-color: #98bc5e;
        border-radius: 5px;
        box-shadow: #82a453 0 2px;
        color: white;
        font-weight: bold;
        margin: 5px 0;
        padding: 10px 20px;
    }
</style>

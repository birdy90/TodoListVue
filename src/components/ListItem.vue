<template lang='pug'>
    div.item-form(v-if='item')
        small
            b ID:
            |
            | {{item.id}}

        textarea(placeholder='введите текст элемента...' rows='4' ref='textarea') {{item.value}}

        .buttons
            button.back(@click='goBack') Назад
            button.save(@click='onSave') Сохранить

    div.item-form(v-else)
        | Загружается...
</template>


<script>
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'ListItem',

    created() {
        if (this.itemsList.length === 0) {
          this.initItemList();
        }
        window.console.log(this.$router.history);
    },

    computed: {
      ...mapState(['itemsList',]),
      item() {
        let id = this.$route.params.id;
        let itemIndex = this.itemsList.findIndex(t => {
          return t.id === id;
        });
        return this.itemsList[itemIndex];
      },
    },
    methods: {
      ...mapMutations(['updateItem',]),
      ...mapActions([
        'initItemList',
      ]),
      goBack() {
        this.$router.history.go(-1);
      },
      onSave() {
        let newValue = this.$refs['textarea'].value;
        this.updateItem({item: this.item, value: newValue});
        this.goBack();
      },
    }
  }
</script>

<style scoped>
    .item-form {
        display: flex;
        flex-direction: column;
    }

    textarea {
        border: none;
        font-size: 0.9em;
        margin: 10px 0;
        padding: 5px;
        width: 100%;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    button {
        border: none;
        background-color: #98bc5e;
        border-radius: 5px;
        box-shadow: #82a453 0 2px;
        color: white;
        font-weight: bold;
        margin: 5px 0;
        padding: 10px 20px;
    }

    button.back {
        background-color: #ff9c38;
        box-shadow: #ec8d39 0 2px;
    }
</style>

<template lang='pug'>
    .pagination(v-if='overallPages > 1')
        svg(style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink").
            <defs>
              <symbol id="icon-arrow-right2" viewBox="0 0 32 32">
                <title>arrow-right2</title>
                <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
              </symbol>
              <symbol id="icon-arrow-left2" viewBox="0 0 32 32">
                <title>arrow-left2</title>
                <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
              </symbol>
            </defs>

        router-link.pagination-page.pagination-prev(v-if='currentPage > 1' :to='`/page/${currentPage - 1}`' tag='div')
            svg
                use(xlink:href="#icon-arrow-left2")
        router-link.pagination-page(v-for='p in overallPages' :to='`/page/${p}`' tag='div' :key='p')
            span(:class='{active: currentPage === p}') {{p}}
        router-link.pagination-page.pagination-prev(v-if='currentPage < overallPages' :to='`/page/${currentPage + 1}`' tag='div')
            svg
                use(xlink:href="#icon-arrow-right2")
</template>

<script>
  export default {
    name: 'Pagination',

    props: [
      'overallPages',
      'currentPage',
      'setPage',
    ],
  }
</script>

<style scoped>
    .pagination {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .pagination-page {
        background-color: white;
        border-radius: 5px;
        box-shadow: #b4b4b4 0 2px;
        color: darkgrey;
        cursor: pointer;
        align-items: center;
        list-style: none;
        margin-left: 10px;
        margin-top: 10px;
        padding: 10px;
    }

    .pagination-page:first-of-type {
        margin-left: 0;
    }

    .pagination-page svg {
        fill: lightgrey;
        height: 16px;
        width: 16px;
    }

    .pagination-page .active {
        font-weight: bold;
        color: black;
    }
</style>

<template lang='pug'>
    .pagination(v-if='overallPages > 1')
        .pagination-prev(v-if='currentPage > 1' @click='setPage(currentPage - 1)') <
        .pagination-page(v-for='p in overallPages' @click='setPage(p)') {{p}}
        .pagination-prev(v-if='currentPage < overallPages' @click='setPage(currentPage + 1)') >
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

</style>

<template>
  <v-row class="pagination">
    <v-col
      md="6"
      sm="6"
      cols="12">
      <v-container class="max-width">
        <v-pagination
          class="my-4"
          v-model="pageNo"
          :length="length" />
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    length: {
      type: Number || String,
      default: null
    },

    currentPage: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      pageNo: 1
    }
  },

  watch: {
    pageNo (val) {
      this.$emit('go-to-page', val)
    }
  },

  created () {
    this.pageNo = this.currentPage ? this.currentPage : this.pageNo
  }
}
</script>
<style scoped>
.pagination {
  justify-content: left;
}
</style>
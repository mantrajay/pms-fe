<template>
  <v-row>
    <v-col
      cols="12"
      :md="cols"
      :sm="cols"
      v-for="item in colCount"
      :key="item">
      <v-card
        outlined
        class="pa-2">
        <v-skeleton-loader type="image, list-item-avatar-three-line" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Skeleton-Loading',
  props: {
    colCount: {
      type: Number,
      default: 4
    },

    cols: {
      type: Number,
      default: 3
    }
  }
}
</script>
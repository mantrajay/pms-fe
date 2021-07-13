<template>
<v-row>
  <v-col
    cols="12"
    md="4"
    sm="4"
    v-for="(items, index) in officers"
    :key="index">
    <v-card>
      <v-img
        :lazy-src="require(`@/assets/loading/loading.gif`)"
        :src="items.image" />
    </v-card>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      officers: [
        { year: 2020, image: require('@/assets/images/officers-2020.jpg') },
        { year: 2019, image: require('@/assets/images/officers-2019.jpg') },
        { year: 2018, image: require('@/assets/images/officers-2018.jpg') }
      ]
    }
  }
}
</script>
<style scoped>
.active {
  position: absolute;
  top: -15px;
  right: 6px;
}
.image {
  width: 100%;
}
</style>
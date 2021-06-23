<template>
<v-row>
  <v-col
    cols="12"
    md="6"
    sm="6">
    <v-card>
      <v-img
        height="140vh"
        :src="require(`@/assets/slide-show/zero.png`)" />
    </v-card>
  </v-col>
  <v-col
    cols="12"
    md="6"
    sm="6">
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
        v-for="(item, index) in items"
        :key="index">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="350px"
            :src="require(`@/assets/slide-show/${item.image}`)" />
          </v-img>
          <v-card-text class="text-center">
            <h2>{{ stringLimit(item.label, 50) }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      items: [
        {
          label: 'Eastern Pangasinan Chapter',
          image: '1.png'
        },
        {
          label: 'Western Pangasinan Chapter',
          image: '2.png'
        },
        {
          label: 'North Central Pangasinan Chapter',
          image: '3.png'
        },
        {
          label: 'South Central Pangasinan Chapter',
          image: '4.png'
        },
        {
          label: 'West Central Pangasinan Chapter',
          image: '5.png'
        },
      ],
    }
  },

  methods: {
    openPdf () {
      window.open('src/assets/94th.pdf', '_blank')
    }
  }
}
</script>
<style scoped>
img {
  width: 50%;
}
.active {
  position: absolute;
  top: -15px;
  right: 6px;
}
</style>
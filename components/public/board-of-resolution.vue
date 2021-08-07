<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
      sm="12"
      v-for="(items, index) in officers"
      :key="index">
      <v-card
        outlined>
        <v-container>
          <v-row>
            <v-col>
              <v-card-title class="headline"><b>{{ items.title }}</b></v-card-title>
              <v-card-title class="mt-n5">{{ items.subTitle }}</v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="7"
              sm="7">
              <v-img
                @click="showImageModal(items.cover)"
                :lazy-src="require(`@/assets/loading/loading.gif`)"
                :src="items.cover" />
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="5">
              <v-card-section>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-for="(image, keys) in items.images"
                    :key="keys"
                    @click="showImageModal(image)">
                    <v-img
                      class="hover"
                      :lazy-src="require(`@/assets/loading/loading.gif`)"
                      :src="image" />
                  </v-col>
                </v-row>
              </v-card-section>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <ImageZoom
      v-if="dialog"
      @close="dialog = false"
      :src="dialogImage"/>
  </v-row>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      dialog: false,
      dialogImage: [],
      officers: [
        {
          year: 2020,
          title: 'BOARD RESOLUTION I SERIES OF 2019',
          subTitle: 'Ammendments on Fixing of Guidelines for a Good Standing Membership in the Pangasinan Medical Society (PMS)',
          cover: require('@/assets/board-of-resolution/2019/bor-1.jpg'),
          images: [
            require('@/assets/board-of-resolution/2019/bor-2.jpg'),
            require('@/assets/board-of-resolution/2019/bor-3.jpg'),
            require('@/assets/board-of-resolution/2019/bor-4.jpg'),
            require('@/assets/board-of-resolution/2019/bor-5.jpg'),
            require('@/assets/board-of-resolution/2019/bor-6.jpg')
          ]
        }
      ]
    }
  },

  methods: {
    showImageModal (items) {
      this.dialog = true
      this.dialogImage = items
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
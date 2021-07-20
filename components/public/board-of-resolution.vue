<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
      sm="12"
      v-for="(items, index) in officers"
      :key="index">
      <v-card>
        <v-container>
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
              <v-card-title class="headline"><b>{{ items.title }}</b></v-card-title>
              <v-card-title class="mt-n5">{{ items.subTitle }}</v-card-title>
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
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card
        class="pa-10"
        outlined>
        <v-toolbar elevation="0">
          <v-row>
            <v-col class="text-center">
              <v-btn
                color="#10946d"
                @click="dialog = false">
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-img
          :lazy-src="require(`@/assets/loading/loading.gif`)"
          :src="dialogImage" />
      </v-card>
    </v-dialog>
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
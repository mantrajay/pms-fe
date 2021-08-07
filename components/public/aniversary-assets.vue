<template>
<div>
  <v-card
    class="mb-5 pa-3"
    outlined>
    <v-row>
      <v-col
        cols="12"
        md="2"
        sm="2" />
        <v-col
        cols="12"
        md="8"
        sm="8"
        class="text-center">
        <div
          class="pl-2 pr-2"
          :class="{'mt-5': $vuetify.breakpoint.lg}">
          <h2>
            <span v-html="yearSup"></span>
            {{ stringLimit(anniversary.title, 65).toUpperCase() }}
          </h2>
          <h4 class="mt-2">{{ anniversary.description }}</h4>
        </div>
        </v-col>
      <v-col
        cols="12"
        md="2"
        sm="2" />
    </v-row>
    <v-row>
      <v-col
        v-if="loading"
        col="12">
        <SkeletonLoading :cols="3" />
      </v-col>
      <v-col
        v-else
        cols="6"
        md="2"
        sm="2"
        v-for="(image, index) in images"
        :key="index"
        @click="showImageModal(image)"
        class="mb-5">
        <v-hover v-slot="{ hover }">
          <v-card outlined>
            <v-img
              class="hover border"
              :lazy-src="require(`@/assets/loading/loading.gif`)"
              :src="image">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out hover-content">
                  <div class="hover-label">
                    <v-icon
                      color="white"
                      size="40">
                      mdi-image-multiple
                    </v-icon>
                    <h5>Preview in Large</h5>
                  </div>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <ImageZoom
      v-if="dialog"
      @close="dialog = false"
      :src="dialogImage"/>
  </v-card>
  <v-row>
  <v-col
      col="12"
      md="12"
      sm="12"
      class="text-center mt-5 mb-5"
      v-if="totalPage > 1">
      <v-btn
        text
        color="#10946d"
        @click="prevPage">
        <v-icon>mdi-arrow-left</v-icon>
        Previous
      </v-btn>
      <v-chip
        class="white--text"
        color="#10946d">
        {{ paging }}
      </v-chip>
      <v-btn
        text
        color="#10946d"
        @click="nextPage">
        Next
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'PDF-Modal',
  components: {
    pdf
  },

  data () {
    return {
      dialog: false,
      loading: false,
      dialogImage: '',
      anniversary: {
        title: '',
        description: '',
        year: ''
      },
      objJson: [],
      currentPage: 1,
      pageLimit: 24,
      paging: '',
      images: [],
      totalPage: 0
    }
  },

  computed: {
    yearSup () {
      let yearNum = this.anniversary.year.slice(0, -2)
      let sup = this.anniversary.year.slice(-2)
      return `${yearNum}<sup>${sup}</sup>`
    }
  },

  created () {
    this.fetchAllAnniversaryAssets()
	},

  methods: {
    fetchAllAnniversaryAssets () {
      this.loading = true
      this.API_POST({ url: `Public_Controller/fetchAnniversaryAssets/${this.$route.params.id}`})
        .then(response => {
          let data = response.data
          this.anniversary.title = data.title
          this.anniversary.year = data.year
          this.anniversary.description = data.description
          for (let index = 0; index < data.imageCount; index++) {
            if (data.year == '76th') {
              let numberString = index + 1
              let numImage = numberString.toString()
              this.objJson.push(`${response.data.path}/76_Anniv__${numImage}.jpg`)
            } else this.objJson.push(`${response.data.path}/${index + 1}.jpg`)
          }
          this.changePage(this.currentPage)
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.changePage(this.currentPage)
      }
    },

    nextPage () {
      if (this.currentPage < this.numPages()) {
        this.currentPage++;
        this.changePage(this.currentPage)
      }
    },
    
    changePage (page) {
        if (page < 1) page = 1
        if (page > this.numPages()) page = this.numPages()
        this.images = []
        for (var i = (page-1) * this.pageLimit; i < (page * this.pageLimit) && i < this.objJson.length; i++) {
          this.images.push(this.objJson[i])
        }
        this.paging = page + "/" + this.numPages()
        this.totalPage = this.numPages()
    },

    numPages () {
      return Math.ceil(this.objJson.length / this.pageLimit)
    },

    showImageModal (items) {
      this.dialog = true
      this.dialogImage = items
    },

    pdfLoaded () {
      this.show = false
    },

    pageLoaded () {
      this.loadedRatio++
    }
  }
}
</script>
<style scoped>
.pdf {
  width: 100%;
  margin: 2px;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
p {
  margin: auto;
}
.border {
  border: 1px solid #929292;
  border-radius: 5px;
}
.hover-content {
  height: 100%;
  background-color: #10946de6;
  width: 100%;
  text-align: center;
}
.hover-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>
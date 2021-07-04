<template>
<v-row>
  <v-col
    cols="12"
    md="3"
    sm="3">
  </v-col>
  <v-col
    cols="12"
    md="6"
    sm="6">
    <v-card outlined>
      <div class="pa-10 text-center">
        <v-img
          class="ma-auto"
          max-width="100"
          max-height="100"
          :src="require('~/assets/images/hymn.jpg')"/>
        <h3 class="mt-5">“Ang Tala Ng Pangasinan”</h3>
        <p class="mt-3"><b>MUSIC:</b> PROF. ROMEO MACABENTO</p>
        <p class="mt-n4"><b>LYRICIST:</b>AURORA HERNANDEZ-MARAMBA</p>
        <h5 class="mt-n3">1984</h5>
      </div>
      <pre class="mt-n5">
        I . SA PUSO NG INANG BAYAN
        AY HIYAS KUMIKINANG
        ANG PAGLILINGKOD SA TANAN
        NG PMS NATING MAHAL.

        II.  ANG DILIM NG GABI AT SIKAT NG ARAW
        AY DI ALINTANA NG DIWA’T PANANAW
        LALO’T MAY NILIKHANG TUNGO’Y TAKIP-SILIM

        REF.:  PINAGBUKLOD NA DAMDAMIN 
        ALAY NA PAGLINGAP, LAKIP AY DALANGIN.
        GINTONG BISIG NG PMS
        KAILAN MAY DI MAGLALAHO
        ANG LUNINGNING NG PMS
        MGA DAKILANG TUNGKULIN
        TAIMTIM NA SINUMPAAN
        BUONG PUSONG TUTUPARIN
        NGAYON AT MAGPAKAILANMAN.

        (REPEAT REFRAIN 1X)
        
        III. PANGASINAN MEDICAL SOCIETY
        BITUWEN KAN PINABPABLI
        SAY TULONG MO ED KARAKLAN
        ANDIN BALOT NALINGWANAN
      </pre>
    </v-card>
  </v-col>
  <v-col
    cols="12"
    md="3"
    sm="3">
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  }
}
</script>
<style scoped>
pre {
  font-family: inherit;
  text-align: center;
}
.logo {
  width: 130px;
  height: 120px;
}
</style>
<template>
<div>
  <Header
    title="POSTGRADUATE REGISTRATION DETAILS"/>
  <v-row class="mt-n5">
    <v-col
      cols="12"
      sm="12"
      md="12">
      <Details />
    </v-col>
  </v-row>
</div>
</template>
<script>
import Details from './components/details'
export default {
  name: 'Postgraduate-Registration-Details',
  components: {
    Details
  },
  data () {
    return {
      showDialog: false
    }
  }
}
</script>

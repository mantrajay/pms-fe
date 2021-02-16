<template>
<v-btn-toggle mandatory>
  <v-btn
    v-for="(items, index) in tabList"
    :key="index"
    :color="items.id == current ? 'primary' : ''"
    @click="goTo(`/patients/${items.link}/${$route.params.id}`)">
    <v-icon :color="items.id == current ? '#fff' : 'secondary'">{{ items.icon }}</v-icon>
    <span
      :class="{'white--text': items.id == current}"
      class="hidden-sm-and-down ma-1">{{ items.name }}</span>
  </v-btn>
</v-btn-toggle>
</template>
<script>
export default {
  name: 'Patient-Navigation',
  props: {
    current: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      tabList: [
        { id: 0,  name: 'Personal Information', icon: 'mdi-badge-account-horizontal-outline', link: 'account'},
        { id: 1,  name: 'Consultation List', icon: 'mdi-hospital-box-outline', link: 'consultations'},
        { id: 2,  name: 'Hospital Admission', icon: 'mdi-hospital-building', link: 'admission'},
      ]
    }
  },
}
</script>
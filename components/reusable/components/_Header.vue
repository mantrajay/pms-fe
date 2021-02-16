<template>
<v-row>
  <v-col
    cols="12"
    md="12"
    sm="12">
    <v-card elevation="0">
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="6">
            <h2>{{ title }}</h2>
          </v-col>
          <v-col cols="12"
            md="6"
            sm="6"
            v-if="showBtn"
            class="text-right">
            <v-btn color="primary"
              @click="$emit('show')">
              <v-icon small>mdi-pencil</v-icon>
              {{ btnLabel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    btnLabel: {
      type: String,
      default: ''
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
h2 {
  font-size: 15pt;
  color: #595959;
}
</style>
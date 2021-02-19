<template>
<div>
  <v-row>
    <v-col
      cols="3"
      sm="3"
      md="3">
      <v-btn
        @click="$emit('event')"
        small
        fab
        color="primary"
        text>
        <v-icon>mdi-format-horizontal-align-left</v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="9"
      sm="9"
      md="9"
      class="text-right">
      <!-- <v-badge
        color="error"
        :content="6"
        overlap>
        <v-btn
          small
          color="primary"
          text
          fab>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      <v-btn
        small
        fab
        color="primary"
        text>
        <v-icon>mdi-calendar-account</v-icon>
      </v-btn> -->
      <v-btn
        @click="confirmLogout"
        small
        color="primary"
        text>
        <v-icon>mdi-calendar-end</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="logout"/>
</div>
</template>
<script>
export default {
  data() {
    return {
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Confirm',
        variant: 'error'
      }
    }
  }
}
</script>
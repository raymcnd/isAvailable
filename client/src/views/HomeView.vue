<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { RouterLink } from 'vue-router';

export default {
  components: { VueDatePicker },
  data() {
  },
  methods: {
    demoButton() {
      this.$router.push("/beetlemusic")
    }
  }
}
</script>

<template>
  <section style="width: 95vw;  height: 95vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h2 class="fw-bold text-white text-left" style="width: 600px;">Welcome</h2>
      <p class="fw-semibold text-white text-left" style="width: 600px;">
        <button class="btn mt-3 fw-semibold text-white" style="background-color: rgb(2, 211, 9);" @click="demoButton">Demo</button>
      </p>
  </section>     
</template>

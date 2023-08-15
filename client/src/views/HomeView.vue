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
  <section style="width: 100vw;  height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h2 class="fw-bold text-white text-left mb-4" style="width: 400px;">Welcome</h2>
      <p class="text-white" style="width: 400px;"><b>isAvailable</b> is a versatile reservation app that can handle reservations based on product type and session.<br><br>
        It can be useful for businesses that rely on reservation, such as private tutors, personal trainers, models, photographers, sport arenas, music studios, and so on.</p>
      <p class="fw-semibold text-white text-left" style="width: 400px;">
        <button class="btn mt-3 fw-semibold text-white" style="background-color: rgb(2, 211, 9); width: 400px;" @click="demoButton">Demo</button>
        <a class="nav-link" href="https://github.com/raymcnd/isAvailable" target="_blank"><button class="mt-3 btn fw-semibold text-white d-flex align-items-center justify-content-center" style="background-color: rgb(2, 211, 9); width: 400px;">
          <img src="../assets/githublogo.png" class="me-2" style="width: 20px;" />  
          Github Repository
        </button></a>
      </p>
  </section>     
</template>

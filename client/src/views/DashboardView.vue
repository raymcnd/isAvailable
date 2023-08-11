<script>
import { mapState } from 'pinia';
import { useReservationStore } from '../stores/reservation';

export default {
    computed: {
        // ...mapState(useReservationStore, ['email']),
        email() {
            return localStorage.email
        }

    }
}
</script>

<template>
    <div class="mt-2" style="display: flex; flex-direction: row; width: 100%; height: 100vh;">
      <div class="col-6">
        <img src="../assets/signin.jpg" alt="" style="object-fit: cover; height: 100%; width: 100%;">
      </div>

      <div class="col-6 p-5 text-white" style="display: flex; flex-direction: column; justify-content: center;">
        <h1 class="mb-5">Should be a dashboard for {{ email }}</h1>
      </div>
    </div>
</template>

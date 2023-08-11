<script>
import { mapActions } from 'pinia';
import { useReservationStore } from "../stores/reservation";

export default {
  data() {
    return {
        email: "",
        password: "",
    }
  },
  methods: {
    // ...mapActions(useUserStore, ['handleSignUp', 'handleGoogleSignIn']),
    ...mapActions(useReservationStore, ['handleSignIn']),
    getDataInObject() {
      return {
        email: this.email,
        password: this.password,
      }
    }
  },
}
</script>

<template>
    <div class="mt-2" style="display: flex; flex-direction: row; width: 100%; height: 100vh;">
      <div class="col-6">
        <img src="../assets/signin.jpg" alt="" style="object-fit: cover; height: 100%; width: 100%;">
      </div>

      <div class="col-6 p-5 text-white" style="display: flex; flex-direction: column; justify-content: center;">
        <h1 class="mb-5">Sign In</h1>
        <form id="registerForm" @submit.prevent="handleSignIn(email, password)">
            <div class="mb-3">
                <label for="emailRegister" class="form-label">Email</label>
                <input type="email" class="form-control" id="emailRegister" required placeholder="e.g. example@mail.com" v-model="email">
            </div>
            <div class="mb-3">
                <label for="passwordRegister" class="form-label">Password</label>
                <input type="password" class="form-control" id="passwordRegister" required aria-describedby="passwordHelp" placeholder="e.g. example123" v-model="password">
                <div id="passwordHelp" class="form-text fst-italic">Minimum five characters.</div>
            </div>
            <!-- <CustomButton :buttonType="'submit'" :buttonText="'Submit'" :buttonColor="'green'" style="width: 100%;" class="mb-3"/> -->
            <button type="submit" class="btn mb-3" style="background-color: rgb(2, 211, 9); width: 100%;">Submit</button>
        </form>
        <div class="d-flex flex-column align-items-center">
          <span>or sign up with Google</span><br>
          <!-- <GoogleLogin :callback="handleGoogleSignIn"/> -->
        </div>
      </div>
    </div>
</template>
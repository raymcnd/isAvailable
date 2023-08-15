import { defineStore } from 'pinia'
import axios from 'axios'

// const baseUrl = "https://ieat.raymcnd.space";
const baseUrl = "http://localhost:3000";


export const useReservationStore = defineStore('reservation', {
  state: () => ({
    availability: {},
   }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchAvailability(username, month, year) {
      try {
        const response = await axios({
          url: baseUrl + "/availability/" + username,
          method: "get",
          params: {
            month, year
          }
        })

        this.availability = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async handleSignUp(input) {
      try {
        const {data} = await axios({
            url: baseUrl + "/register",
            method: "post",
            data: input
        })
        this.router.push("/signin");
      } catch (err) {
          console.log(err);
      }
    },
    async handleSignIn(email, password) {
      try {
          const {data} = await axios({
              url: baseUrl + "/login",
              method: "post",
              data: {
                  email,
                  password
              }
          })
          localStorage.access_token = data.access_token;
          localStorage.email = email;
          // this.access_token = data.access_token;
          // this.showSuccess("Sign In Success")
          this.router.push("/dashboard");
      } catch (err) {
          this.showError(err);
      }
    },
    async payment(productId) {
      try {
        const { value: email } = await Swal.fire({
          input: 'email',
          inputLabel: 'We will send the reservation confirmation to your email',
          inputPlaceholder: 'Enter your email address'
        })
        
        if (email) {
          const response = await axios({
            url: baseUrl + "/generate-midtrans-token",
            method: "post",
            data: {
              email,
              productId
            }
          })
          // console.log(response.data.token, "<<< token")
  
          window.snap.pay(response.data.token, {
            onSuccess: function(result){
              /* You may add your own implementation here */
              alert("payment success!"); console.log(result);
            },
            // onPending: function(result){
            //   /* You may add your own implementation here */
            //   alert("wating your payment!"); console.log(result);
            // },
            // onError: function(result){
            //   /* You may add your own implementation here */
            //   alert("payment failed!"); console.log(result);
            // },
            // onClose: function(){
            //   /* You may add your own implementation here */
            //   alert('you closed the popup without finishing the payment');
            // }
          })
        }



      } catch (err) {
        console.log(err)
      }
    }

  },
})

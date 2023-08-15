<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { mapState, mapActions } from 'pinia';
import { useReservationStore } from "../stores/reservation"

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: new Date(),
    //   sessionSelected: "",
    //   productSelected: "",
      sessionSelected: {},
      productSelected: {price: 0},
      availableSessions: [],
      card: "availability",
      rerender: 0
    };
  },
  computed: {
    ...mapState(useReservationStore, ['availability']),

    notAvailableDate() {
    //   if ((new Date()).getDate)
    //   return 
    },

    availabilityByDate() {
        let selectedDate = (this.date).getDate()
        console.log(this.availability[selectedDate])
        return this.availability[selectedDate]
    },

    activeMonth() {
        this.date.getDate()
    }
  },
  methods: {
    ...mapActions(useReservationStore, ['fetchAvailability', "payment"]),

    handleMonthYear({instance, month, year}) {
        this.fetchAvailability(this.$route.params.username, month, year)
    },

    nextButton() {
        this.card = "reservationDetails"
    },

    backButton() {
        this.card = "availability"
    },
  },
  created() {
    this.fetchAvailability(this.$route.params.username)
  },
  watch: {
    productSelected() {
      try {
        for (let product of this.availabilityByDate) {
            if (product.productId === this.productSelected.id) {
                this.availableSessions = product.availableSessions
            }
        }
      } catch (error) {
        console.log(error)
      }
    },
    date() {
      try {
        for (let product of this.availabilityByDate) {
            if (product.productId === this.productSelected.id) {
                this.availableSessions = product.availableSessions
            }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <section class="mt-5" style="width: 95vw;  height: 95vh; display: flex; flex-direction: column; align-items: center;">
      <h1 class="fw-bold text-white text-left ps-5 text-center mb-5" style="width: 800px;">Is <u>Beetle Music</u> available?</h1>
      <div class="mt-4" style="display: flex; width: 800px;gap: 20px">
        <div class="d-flex justify-content-center align-item-center p-5" style="flex-direction: column;">
          <h5 class="text-white mb-3">Pick a Date 📅</h5>
          <VueDatePicker v-model="date" inline auto-apply :enable-time-picker="false" :min-date="new Date()" @update-month-year="handleMonthYear"/>
        </div>
      
        <div class="card py-3 px-4 text-white rounded-right" style="background-color: blueviolet; flex-grow: 1;" v-if="card === 'availability'">
          <h5 class="mb-3">Availability 🕒</h5>
          
          <h6>Choose a Product</h6>
          <p>
            <div class="form-check" v-for="product in availabilityByDate" :key="product.productId">
              <input class="form-check-input" type="radio" :value="{id: product.productId, name: product.productName, price: product.productPrice}" v-model="productSelected">
              <label class="ms-2">{{ product.productName }} <span class="fst-italic fw-light">({{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.productPrice) }})</span></label>
            </div>
          </p>

          <h6 class="mt-4">Choose a Session</h6>
          <div>
            <div class="form-check" v-for="session in availableSessions" :key="session.sessionId">
              <input class="form-check-input" type="radio" :value="{id: session.sessionId, name: session.sessionName}" v-model="sessionSelected">
              <!-- <input class="form-check-input" type="radio" :value="session.sessionId" v-model="sessionSelected"> -->
              <label class="ms-2">{{ session.sessionName }}</label>
            </div>

            <span class="fst-italic fw-light" v-if="!productSelected.name">Please choose a product to check available sessions</span>
          </div>

          <div style="flex-grow: 1;"></div>
          <button class="card-footer btn fw-bold mb-2 rounded" style="background-color: rgb(2, 211, 9);" @click="nextButton">Next</button>
        </div>

        <div class="card py-3 px-4 text-white rounded-right" style="background-color: blueviolet; flex-grow: 1;" v-if="card === 'reservationDetails'">
            <h5 class="mb-2">Reservation Details 🧾</h5>
            <form style="display: flex; flex-direction: column;" @submit.prevent="payment(productSelected.id)">
                <div class="mb-2">
                    <label for="" class="form-label">Date</label>
                    <input type="text" class="form-control" id="" disabled :value="date.toLocaleDateString('en-EN', {dateStyle: 'long'})">
                </div>
                <div class="mb-2">
                    <label for="" class="form-label">Product</label>
                    <input type="text" class="form-control" id="" disabled :value="productSelected.name">
                </div>
                <div class="mb-2">
                    <label for="" class="form-label">Session</label>
                    <input type="text" class="form-control" id="" disabled :value="sessionSelected.name">
                </div>
                <div class="mb-2">
                    <label for="" class="form-label">Price</label>
                    <input type="price" class="form-control" id="" disabled :value="new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(productSelected.price)">
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->

                <div class="d-flex justify-content-end mt-2">
                    <button class="btn fw-bold text-white" @click="backButton" style="background-color: rgb(242, 191, 38);">Back</button>
                    <button type="submit" class="btn ms-3 fw-bold text-white" style="background-color: rgb(2, 211, 9);">Submit</button>
                </div>
            </form>
        </div>
      </div>
  </section>     
</template>

<style></style>
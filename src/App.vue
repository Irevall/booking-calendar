<template>
  <div class="app">
    <booking-view :booking="booking"/>
  </div>
</template>

<script>
  import BookingView from '@/components/booking-view'
  import { Booking } from '@/models/Booking'

  export default {
    name: 'booking-app',
    components: { BookingView },
    data () {
      return {
        booking: {},
      }
    },
    created () {
      const fakeApiResponse = new Booking({
        pricePerDay: 298,
        rating: 4.35,
        voteCount: 123,
        availableDates: [
          new Date(2019, 8, 31),
          new Date(2019, 9, 2),
          new Date(2019, 9, 3),
          new Date(2019, 9, 4),
          new Date(2019, 9, 6),
          new Date(2019, 9, 8),
          new Date(2019, 9, 9),
          new Date(2019, 9, 13),
          new Date(2019, 9, 14),
          new Date(2019, 9, 15),
          new Date(2019, 9, 16),
          new Date(2019, 9, 17),
          new Date(2019, 9, 18),
          new Date(2019, 9, 19),
          new Date(2019, 9, 21),
          new Date(2019, 9, 23),
          new Date(2019, 9, 24),
          new Date(2019, 9, 25),
          new Date(2019, 9, 29),
          new Date(2019, 9, 30),
          new Date(2019, 9, 31),
          new Date(2019, 10, 1),
          new Date(2019, 10, 8),
          new Date(2019, 10, 14),
          new Date(2019, 10, 19),
          new Date(2019, 10, 21),
          new Date(2019, 10, 22),
          new Date(2019, 10, 23),
          new Date(2019, 10, 27),
          new Date(2019, 10, 30),
        ],
      })

      this.booking = fakeApiResponse
    }
  }
</script>

<style lang="scss">
  @import '@/assets/style/global.scss';

  .app {
    display: grid;
    justify-content: center;
    align-items: start;
    min-height: 100vh;
    padding: 4rem;
    background: #ececec;
  }
</style>

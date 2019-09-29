<template>
  <div class="app">
    <app-booking  :price-per-day="pricePerDay"
                  :rating="rating"
                  :available-dates="availableDates"
    />
  </div>
</template>

<script>
  import AppBooking from '@/components/app-booking'

  export default {
    name: 'booking-calendar',
    components: { AppBooking },
    data () {
      return {
        pricePerDay: 257,
        rating: {
          average: 4.35,
          amount: 128,
        },
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
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/style/global.scss';

  .app {
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #ececec;
  }
</style>

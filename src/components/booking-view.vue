<template>
  <div class="booking-view">
    <booking-header :price-per-day="booking.pricePerDay" :rating="booking.rating" :vote-count="booking.voteCount"/>

    <div class="booking-view__separator"></div>

    <booking-dates
      :available-dates="booking.availableDates"
      v-model="desiredDates"
      @new-dates="updateDates"
    />
  </div>
</template>

<script>
  import AppCalendar from '@/components/booking-calendar'
  import BookingHeader from '@/components/booking-header'
  import { Booking } from '@/models/Booking'
  import BookingDates from '@/components/booking-dates'

  export default {
    name: 'booking-view',
    components: { BookingDates, BookingHeader, AppCalendar },
    props: {
      booking: Booking,
    },
    data () {
      return {
        desiredDates: {
          checkIn: null,
          checkOut: null,
        },
      }
    },
    methods: {
      updateDates (input) {
        const { checkIn, checkOut } = input
        console.log(checkIn)
        console.log(checkOut)
      }
    }
  }
</script>

<style lang=scss>
  .booking-view {
    display: flex;
    flex-direction: column;
    border: 1px solid #b4b4b4;
    padding: 1.25rem;
  }

  .booking-view__separator {
    margin: 1.5rem 0;
    height: 1px;
    width: 100%;
    background: #b4b4b4;
  }

  .booking-view__calendar {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
  }
</style>

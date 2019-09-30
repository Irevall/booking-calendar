<template>
  <div class="booking-view">
    <booking-header :price-per-day="booking.pricePerDay" :rating="booking.rating" :vote-count="booking.voteCount"/>

    <div class="booking-view__separator"></div>

    <booking-dates
      :available-dates="booking.availableDates"
      v-model="desiredDates"
    />

    <booking-info
      :price-per-day="booking.pricePerDay"
      :nights-checked="nightsChecked"
      v-show="nightsChecked"
    />

    <div class="booking-view__submit" :class="{ 'booking-view__submit--invalid': !nightsChecked }">
      Book
    </div>
  </div>
</template>

<script>
  import AppCalendar from '@/components/booking-calendar'
  import BookingHeader from '@/components/booking-header'
  import { Booking } from '@/models/Booking'
  import BookingDates from '@/components/booking-dates'
  import BookingInfo from '@/components/booking-info'

  export default {
    name: 'booking-view',
    components: { BookingInfo, BookingDates, BookingHeader, AppCalendar },
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
    computed: {
      nightsChecked () {
        if (!this.desiredDates.checkIn || !this.desiredDates.checkOut) return 0
        return Math.ceil((this.desiredDates.checkOut.getTime() - this.desiredDates.checkIn.getTime()) / 24 / 60 / 60 / 1000) + 1
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

  .booking-view__submit {
    background: #005c5c;
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    align-self: center;
    font-size: 1.5rem;
    font-weight: 600;
    /*text-transform: uppercase;*/
    color: white;
    cursor: pointer;

    &--invalid {
      background: grey;
      cursor: not-allowed;
    }
  }
</style>

<template>
  <div class="booking-dates">
    <span class="booking-dates__label">Dates</span>
    <div class="booking-dates__checked">
      <span class="booking-dates__check booking-dates__check--in" :class="{ 'booking-dates__check--active': selectedType === 'checkIn' }"
            @click="selectType('checkIn')">Check In</span>
      <font-awesome-icon class="booking-dates__check-separator" icon="angle-double-right"/>
      <span  class="booking-dates__check booking-dates__check--out" :class="{ 'booking-dates__check--active': selectedType === 'checkOut' }"
             @click="selectType('checkOut')">Check Out</span>

      <booking-calendar class="booking-dates__calendar"
                        :available-dates="availableDates" :check-in="$attrs.value.checkIn" :check-out="$attrs.value.checkOut"
                        @select-date="applyDateSelection" v-show="selectedType"/>
    </div>
  </div>
</template>

<script>

  import BookingCalendar from '@/components/booking-calendar'
  export default {
    name: 'booking-dates',
    components: { BookingCalendar },
    props: {
      availableDates: Array,
    },
    data () {
      return {
        selectedType: false,
      }
    },
    methods: {
      selectType (type) {
        this.selectedType = type
      },
      applyDateSelection (date) {
        if (!this.checkIn || !this.checkOut) {
          this.$emit('input', {
            checkIn: date,
            checkOut: date,
          })
        }
      }
    }
  }
</script>

<style lang=scss>
  .booking-dates__label {
    font-weight: 800;
  }

  .booking-dates__checked {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
    border: 1px solid #b4b4b4;
    padding: 0.5rem;
    font-size: 1.35rem;
  }

  .booking-dates__check {
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color .3s ease-out;

    &:hover:not(&--active) {
      background: #b2ebe8;
    }

    &--active {
      background: #a1d9d6;
    }

    &--in {
      padding-right: 2.5rem;
    }

    &--out {
      padding-left: 2.5rem;
    }
  }

  .booking-dates__check-separator {
    margin: 0 0.5rem;
  }

  .booking-dates__calendar {
    position: absolute;
    left: 0;
    top: calc(100% + 0.75rem);
  }
</style>

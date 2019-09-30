<template>
  <div class="booking-dates">
    <span class="booking-dates__label">Dates</span>

    <div class="booking-dates__checks" :class="{ 'booking-dates__checks--checked': isActive && checkIn && checkOut }" @click="toggleActive(true)">
      <span class="booking-dates__check booking-dates__check--in">
        {{(checkIn ? checkIn : 'Check In') | date }}
      </span>

      <font-awesome-icon class="booking-dates__check-separator" icon="angle-double-right"/>

      <span class="booking-dates__check booking-dates__check--out">
        {{(checkOut ? checkOut : 'Check Out') | date }}
      </span>
    </div>

    <booking-calendar class="booking-dates__calendar"
                      :available-dates="availableDates"
                      :check-in="checkIn" :earliest-check-in="earliestCheckIn"
                      :check-out="checkOut" :latest-check-out="latestCheckOut"
                      @select-date="applyDateSelection" @hide="toggleActive(false)" v-show="isActive"/>
  </div>
</template>

<script>

  import BookingCalendar from '@/components/booking-calendar'
  import { compareDates } from '@/helpers/date'

  export default {
    name: 'booking-dates',
    components: { BookingCalendar },
    props: {
      availableDates: Array,
    },
    data () {
      return {
        isActive: false,
      }
    },
    computed: {
      checkIn () {
        return this.$attrs.value.checkIn
      },
      checkOut () {
        return this.$attrs.value.checkOut
      },
      latestCheckOut () {
        if (!this.checkIn && !this.checkIn) return this.availableDates[this.availableDates.length - 1]

        const anyCheck = this.checkOut || this.checkIn

        const availableCheckOuts = this.availableDates.filter(date => date >= anyCheck)

        const checkInYear = anyCheck.getFullYear()
        const checkInMonth = anyCheck.getMonth()
        const checkInDate = anyCheck.getDate()

        let i = 1

        while (compareDates(new Date(checkInYear, checkInMonth, checkInDate + i), availableCheckOuts[i])) {
          i++
        }

        return availableCheckOuts[i - 1]
      },
      earliestCheckIn () {
        if (!this.checkIn && !this.checkOut) return this.availableDates[0]

        const anyCheck = this.checkIn || this.checkOut

        const availableCheckIns = this.availableDates.filter(date => date <= anyCheck).sort((a, b) => b - a)

        const checkOutYear = anyCheck.getFullYear()
        const checkOutMonth = anyCheck.getMonth()
        const checkOutDate = anyCheck.getDate()

        let i = 1

        while (compareDates(new Date(checkOutYear, checkOutMonth, checkOutDate - i), availableCheckIns[i])) {
          i++
        }

        return availableCheckIns[i - 1]
      }
    }
    ,
    methods: {
      toggleActive (state) {
        setImmediate(() => this.isActive = state)
      },
      applyDateSelection (date) {
        if (date < this.earliestCheckIn || date > this.latestCheckOut) return
        if (this.checkIn && date < this.checkIn) return
        if (this.checkOut && date > this.checkOut) return

        if (!this.checkIn && (!this.checkOut || date < this.checkOut)) return this.$emit('input', {
          checkIn: date,
          checkOut: this.checkOut
        })

        if (!this.checkOut && (!this.checkIn || date > this.checkIn)) return this.$emit('input', {
          checkIn: this.checkIn,
          checkOut: date
        })

        if (compareDates(this.checkIn, date) && compareDates(this.checkOut, date)) return this.$emit('input', {
          checkIn: null,
          checkOut: null
        })

        if (compareDates(this.checkIn, date) && this.checkOut) return this.$emit('input', {
          checkIn: null,
          checkOut: this.checkOut
        })

        if (compareDates(this.checkOut, date) && this.checkIn) return this.$emit('input', {
          checkIn: this.checkIn,
          checkOut: null
        })

        if (!this.checkIn || !this.checkOut) return this.$emit('input', { checkIn: date, checkOut: date })
      }
    }
  }
</script>

<style lang=scss>
  .booking-dates {
    position: relative;
  }

  .booking-dates__label {
    font-weight: 800;

  }

  .booking-dates__checks {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
    border: 1px solid #b4b4b4;
    padding: 0.5rem;
    font-size: 1.35rem;
    cursor: pointer;

    transition: background-color .3s ease-out;

    &--checked {
      background: #cef1f1;
    }
  }

  .booking-dates__check {
    @include flex-center;
    min-width: 125px;
    padding: 0.5rem 1rem;
    transition: background-color .3s ease-out;
  }

  .booking-dates__check-separator {
    margin: 0 1rem;
  }

  .booking-dates__calendar {
    position: absolute;
    left: 0;
    top: calc(100% + 0.75rem);
  }
</style>

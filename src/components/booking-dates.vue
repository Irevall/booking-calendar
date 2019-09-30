<template>
  <div class="booking-dates">
    <span class="booking-dates__label">Dates</span>
    <div class="booking-dates__checked">
      <span class="booking-dates__check booking-dates__check--in"
            :class="{ 'booking-dates__check--active': selectedType === 'checkIn' }"
            @click="selectType('checkIn')">{{(checkIn ? checkIn : 'Check In') | date }}</span>
      <font-awesome-icon class="booking-dates__check-separator" icon="angle-double-right"/>
      <span class="booking-dates__check booking-dates__check--out"
            :class="{ 'booking-dates__check--active': selectedType === 'checkOut' }"
            @click="selectType('checkOut')">{{(checkOut ? checkOut : 'Check Out') | date }}</span>

      <booking-calendar class="booking-dates__calendar"
                        :available-dates="availableDates" :check-in="$attrs.value.checkIn"
                        :check-out="$attrs.value.checkOut"
                        @select-date="applyDateSelection" v-show="selectedType"/>
    </div>
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
        selectedType: null,
      }
    },
    computed: {
      checkIn () {
        return this.$attrs.value.checkIn
      },
      checkOut () {
        return this.$attrs.value.checkOut
      }
    },
    methods: {
      selectType (type) {
        if (type === this.selectedType) return this.selectedType = null
        this.selectedType = type
      },
      applyDateSelection (date) {
        let possibleCheckIn = this.checkIn
        let possibleCheckOut = this.checkOut

        if (!this.checkIn || this.selectedType === 'checkIn' && date <= this.checkOut) possibleCheckIn = date
        if (!this.checkOut || this.selectedType === 'checkOut' && date >= this.checkIn) possibleCheckOut = date

        if (this.selectedType === 'checkIn') this.selectedType = 'checkOut'

        if (possibleCheckIn === this.checkIn && possibleCheckOut === this.checkOut) {
          console.log('same date')
          return
        }


        const daysBetween = this.checkIfAllDatesAvailable(possibleCheckIn, possibleCheckOut)
        if (daysBetween === null) {
          console.log('cant do that chief')
          return this.$emit('input', { checkIn: date, checkOut: date, dayCount: 1 })
        }

        console.log('im so far')
        return this.$emit('input', { checkIn: possibleCheckIn, checkOut: possibleCheckOut, dayCount: daysBetween })
      },
      checkIfAllDatesAvailable (possibleCheckIn, possibleCheckOut) {
        const possibleCheckInDate = possibleCheckIn.getDate()
        let dateToCheck = new Date(possibleCheckIn)

        const availableDatesBetween = this.availableDates.filter(date => {
          return date >= possibleCheckIn && date <= possibleCheckOut
        })
        console.log('available dates:')
        console.log(availableDatesBetween)


        let i = 0
        while (possibleCheckOut && dateToCheck < possibleCheckOut) {
          if (!compareDates(dateToCheck, availableDatesBetween[i])) {
            return null
          }

          i++
          dateToCheck.setDate(possibleCheckInDate + i)
        }
        return availableDatesBetween.length
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
    @include flex-center;
    min-width: 115px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color .3s ease-out;

    &:hover:not(&--active) {
      background: #b2ebe8;
    }

    &--active {
      background: #a1d9d6;
    }
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

<template>
  <div class="booking-calendar">
    <div class="booking-calendar__header">
      <div class="booking-calendar__month-change booking-calendar__month-change--previous" @click="selectPreviousMonth">
        <font-awesome-icon icon="chevron-left"/>
      </div>
      <span class="booking-calendar__current-month">{{ `${selectedMonthString} ${selected.year}` }}</span>
      <div class="booking-calendar__month-change booking-calendar__month-change--next" @click="selectNextMonth">
        <font-awesome-icon icon="chevron-right"/>
      </div>

      <calendar-dates/>
    </div>
  </div>
</template>

<script>
  import { dayNames, monthNames } from '@/resources/Date'
  import { compareDates } from '@/helpers/date'
  import CalendarDates from '@/components/calendar/calendar-dates'

  export default {
    name: 'booking-calendar',
    components: { CalendarDates },
    data () {
      return {
        dateNow: new Date(),
        selected: {
          year: null,
          month: null,
        },
      }
    },
    computed: {
      // TODO: trim computed
      // TODO: props.availableDates. map to unix, so it's quicker to compare (just .includes())...
      // or rethink it, since compareDates is already pretty efficient, so for loop shouldn't take much longer?


      previousMonth () {
        return {
          year: this.selected.year - (this.selected.month ? 0 : 1),
          month: this.selected.month ? this.selected.month - 1 : 11
        }
      },
      nextMonth () {
        return {
          year: this.selected.year + (this.selected.month < 11 ? 0 : 1),
          month: this.selected.month < 11 ? this.selected.month + 1 : 0
        }
      },
      shortDayNames () {
        return dayNames.map(day => day.slice(0, 3))
      },
      selectedMonthString () {
        return monthNames[this.selected.month]
      },
      firstDayOfSelectedMonth () {
        return new Date(this.selected.year, this.selected.month, 1)
      },
      lastDayOfSelectedMonth () {
        return new Date(this.nextMonth.year, this.nextMonth.month, 0)
      },
      selectedMonthLength () {
        return this.lastDayOfSelectedMonth.getDate()
      },
      visibleDays () {
        const days = []

        // TODO: explain/refactor loop
        for (let i = 1 - this.firstDayOfSelectedMonth.getDay();
          i <= this.selectedMonthLength + (6 - this.lastDayOfSelectedMonth.getDay());
          i++) {
          const date = new Date(this.selected.year, this.selected.month, i)
          days.push({
            date,
            unix: date.getTime(),
            isToday: compareDates(date, this.dateNow),
            isSameMonth: date.getMonth() === this.selected.month && date.getFullYear() === this.selected.year,
            isAvailable: true,
          })
        }

        return days
      }
    },
    methods: {
      selectPreviousMonth () {
        this.selected = this.previousMonth
      },
      selectNextMonth () {
        this.selected = this.nextMonth
      },
      isToday (date) {
        return compareDates(date, this.dateNow)
      },
      isSameMonth (date) {
        console.log(date)
        return date.getMonth() === this.selected.month
            && date.getFullYear() === this.selected.year
      }
    },
    created () {
      this.selected.year = this.dateNow.getFullYear()
      this.selected.month = this.dateNow.getMonth()
    }
  }
</script>

<style lang=scss>
  .booking-calendar {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    background: #ffffff;
    font-weight: 600;
    user-select: none;
  }

  .booking-calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #00dbb1;
    font-size: 1.5rem;
  }

  .booking-calendar__month-change {
    display: flex;
    color: #4b4b4b;
    border-bottom: 1px solid #4b4b4b;
    cursor: pointer;
  }

  .booking-calendar__current-month {
    color: white;
  }
</style>

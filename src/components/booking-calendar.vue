<template>
  <div class="booking-calendar">
    <div class="booking-calendar__header">
      <div class="booking-calendar__month-change booking-calendar__month-change--previous" @click="selectPreviousMonth">
        <font-awesome-icon icon="chevron-left"/>
      </div>
      <span class="booking-calendar__current-month">{{ `${selectedMonthString} ${selectedPeriod.year}` }}</span>
      <div class="booking-calendar__month-change booking-calendar__month-change--next" @click="selectNextMonth">
        <font-awesome-icon icon="chevron-right"/>
      </div>
    </div>

    <div class="booking-calendar__days">
      <div class="booking-calendar__days-header">
        <span class="booking-calendar__day-name" v-for="day in shortDayNames" :key="day">{{ day }}</span>
      </div>

      <div class="booking-calendar__list">
        <calendar-day v-for="day in visibleDays" :key="day.dateUnix" v-bind="day"
                      @inner-click="registerDayClick(day)" @inner-hover="registerDayHover(day)"/>
      </div>
    </div>

    <div class="test" @click.exact="backgroundClicked"></div>
  </div>
</template>

<script>
  import { dayNames, monthNames } from '@/resources/Date'
  import { compareDates } from '@/helpers/date'
  import CalendarDay from '@/components/calendar/calendar-day'

  export default {
    name: 'booking-calendar',
    components: { CalendarDay },
    props: {
      availableDates: Array,
      checkIn: Date,
      earliestCheckIn: Date,
      checkOut: Date,
      latestCheckOut: Date,
    },
    data () {
      return {
        dateNow: new Date(),
        selectedPeriod: {
          year: null,
          month: null,
        },
        hoveredDay: null,
        mouseOverCalendar: false,
      }
    },
    computed: {
      // TODO: trim computed

      previousMonth () {
        return {
          year: this.selectedPeriod.year - (this.selectedPeriod.month ? 0 : 1),
          month: this.selectedPeriod.month ? this.selectedPeriod.month - 1 : 11
        }
      },
      nextMonth () {
        return {
          year: this.selectedPeriod.year + (this.selectedPeriod.month < 11 ? 0 : 1),
          month: this.selectedPeriod.month < 11 ? this.selectedPeriod.month + 1 : 0
        }
      },
      shortDayNames () {
        return dayNames.map(day => day.slice(0, 3))
      },
      selectedMonthString () {
        return monthNames[this.selectedPeriod.month]
      },
      firstDayOfSelectedMonth () {
        return new Date(this.selectedPeriod.year, this.selectedPeriod.month, 1)
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
          const date = new Date(this.selectedPeriod.year, this.selectedPeriod.month, i)
          const dateUnix = date.getTime()
          days.push({
            date,
            dateUnix,
            isToday: compareDates(date, this.dateNow),
            isSameMonth: date.getMonth() === this.selectedPeriod.month && date.getFullYear() === this.selectedPeriod.year,
            isAvailable: this.availableDatesInUnix.includes(dateUnix),
            isCheckIn: compareDates(date, this.checkIn),
            isCheckOut: compareDates(date, this.checkOut),
            isPotentialCheckIn: compareDates(date, this.potentialCheckIn),
            isPotentialCheckOut: compareDates(date, this.potentialCheckOut),
            isBetweenChecks: (this.checkIn && date > this.checkIn || this.potentialCheckIn && date > this.potentialCheckIn)
              && (this.checkOut && date < this.checkOut || this.potentialCheckOut && date < this.potentialCheckOut)
          })
        }

        return days
      },
      availableDatesInUnix () {
        return this.availableDates.map(date => date.getTime())
      },
      potentialCheckIn () {
        if (this.checkIn || !this.checkOut || this.hoveredDay >= this.checkOut) return null
        if (this.hoveredDay < this.earliestCheckIn) return this.earliestCheckIn
        return this.hoveredDay
      },
      potentialCheckOut () {
        if (this.checkOut || !this.checkIn || this.hoveredDay <= this.checkIn) return null
        if (this.hoveredDay > this.latestCheckOut) return this.latestCheckOut
        return this.hoveredDay
      }
    },
    methods: {
      selectPreviousMonth () {
        this.selectedPeriod = this.previousMonth
      },
      selectNextMonth () {
        this.selectedPeriod = this.nextMonth
      },
      registerDayClick (day) {
        if (!day.isAvailable) return

        this.$emit('select-date', day.date)
      },
      registerDayHover (day) {
        this.hoveredDay = day.date
      },
      backgroundClicked () {
        this.$emit('hide')
      }
    },
    created () {
      this.selectedPeriod.year = this.dateNow.getFullYear()
      this.selectedPeriod.month = this.dateNow.getMonth()
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

  .booking-calendar__header, .booking-calendar__days {
    z-index: 2;
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

  .booking-calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-row-gap: 0.5rem;
    padding: 1rem 1.5rem;
  }

  .booking-calendar__day-name {
    color: #808080;
    text-align: center;
  }

  .booking-calendar__days-header, .booking-calendar__list {
    display: contents;
  }

  .test {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>

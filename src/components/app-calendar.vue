<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__month-change calendar__month-change--previous" @click="selectPreviousMonth">></div>
      <span class="calendar__current-month">{{ `${selectedMonthString} ${selected.year}` }}</span>
      <div class="calendar__month-change calendar__month-change--next" @click="selectNextMonth">></div>
    </div>

    <div class="calendar__days">
      <div class="days__header">
        <span class="days__day-name" v-for="day in shortDayNames" :key="day">{{ day }}</span>
      </div>

      <div class="days__days">
        <div class="" v-for="day in visibleDays" :key="day.getTime()">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dayNames, monthNames } from '@/resources/Date'

  export default {
    name: 'app-calendar',
    data () {
      return {
        dateNow: new Date(),
        selected: {
          year: null,
          month: null,
        }
      }
    },
    computed: {
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
      lastDayOfPreviousMonth () {

      },
      visibleDays () {
        const days = []

        for (let i = 1 - this.firstDayOfSelectedMonth.getDay();
          i <= this.selectedMonthLength + (6 - this.lastDayOfSelectedMonth.getDay());
          i++) {
          days.push(new Date(this.selected.year, this.selected.month, i))
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
      }
    },
    created () {
      this.selected.year = this.dateNow.getFullYear()
      this.selected.month = this.dateNow.getMonth()
    }
  }
</script>

<style lang=scss>
  .calendar {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    background: #ffffff;
  }

  .calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #00dbb1;
  }

  .calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 0.5rem;
  }

  .days__header, .days__days {
    display: contents;
  }
</style>

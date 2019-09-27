<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__month-change calendar__month-change--previous" @click="selectPreviousMonth">
        <font-awesome-icon icon="chevron-left"/>
      </div>
      <span class="calendar__current-month">{{ `${selectedMonthString} ${selected.year}` }}</span>
      <div class="calendar__month-change calendar__month-change--next" @click="selectNextMonth">
        <font-awesome-icon icon="chevron-right"/>
      </div>
    </div>

    <div class="calendar__days">
      <div class="days__header">
        <span class="days__day-name" v-for="day in shortDayNames" :key="day">{{ day }}</span>
      </div>

      <div class="days__day-list">
        <div class="days__day-wrapper"
             v-for="day in visibleDays" :key="day.getTime()"
             :class="{  'days__day-wrapper--today': isToday(day),
                        'days__day-wrapper--available': true,
                        'days__day-wrapper--current-month': isSameMonth(day)
              }">
          <div class="days__day">
            {{ day.getDate() }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dayNames, monthNames } from '@/resources/Date'
  import { compareDates } from '@/helpers/date'

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
  .calendar {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    background: #ffffff;
    font-weight: 600;
    user-select: none;
  }

  .calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #00dbb1;
    font-size: 1.5rem;
  }

  .calendar__month-change {
    display: flex;
    color: #4b4b4b;
    border-bottom: 1px solid #4b4b4b;
    cursor: pointer;
  }

  .calendar__current-month {
    color: white;
  }

  .calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-row-gap: 0.5rem;
    padding: 1rem 1.5rem;
  }

  .days__day-name {
    color: #808080;
    text-align: center;
  }

  .days__day-name, .days__day-wrapper {
    /*padding: 0.5rem;*/
  }

  .days__day-wrapper {
    @include flex-center;
    position: relative;
    color: #5d5d5d;
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;

    &--today {
      border-radius: 50%;
      border: 2px solid #00dbb1;
    }

    &--current-month {
      color: red;
    }
  }

  .days__day {
   position: absolute;
  }

  .days__header, .days__day-list {
    display: contents;
  }
</style>

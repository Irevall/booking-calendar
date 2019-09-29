<template>
  <div class="calendar-dates">
    <div class="calendar-dates__header">
      <span class="calendar-dates__day-name" v-for="day in shortDayNames" :key="day">{{ day }}</span>
    </div>

    <div class="calendar-dates__list">
      <div class="calendar-dates__date-wrapper"
           v-for="day in visibleDays" :key="day.getTime()"
           :class="{  'days__day-wrapper--today': isToday(day),
                        'days__day-wrapper--available': true,
                        'days__day-wrapper--current-month': isSameMonth(day)
              }">
        <div class="calendar-dates__date">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calendar-dates'
  }
</script>

<style lang=scss>
  .calendar-dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-row-gap: 0.5rem;
    padding: 1rem 1.5rem;
  }

  .calendar-dates__day-name {
    color: #808080;
    text-align: center;
  }

  .calendar-dates__day-name, .calendar-dates__day-wrapper {
    /*padding: 0.5rem;*/
  }

  .calendar-dates__day-wrapper {
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
      color: black;
      cursor: pointer;
    }
  }

  .calendar-dates__day {
    position: absolute;
  }

  .calendar-dates__header, .calendar-dates__day-list {
    display: contents;
  }
</style>

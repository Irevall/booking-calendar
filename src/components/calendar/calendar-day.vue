<template>
  <div class="calendar-day"
       :class="{  'calendar-day--today': isToday,
                  'calendar-day--available': isAvailable,
                  'calendar-day--current-month': isSameMonth
              }">
    <div class="calendar-day__date">
      {{ date.getDate() }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calendar-day',
    props: {
      date: Date,
      dateUnix: Number,
      isToday: Boolean,
      isSameMonth: Boolean,
      isAvailable: Boolean,

    }
  }
</script>

<style lang=scss>
  .calendar-day {
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

  .calendar-day__date {
    position: absolute;
  }
</style>

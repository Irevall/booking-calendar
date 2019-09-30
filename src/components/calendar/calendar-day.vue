<template>
  <div class="calendar-day"
       :class="{  'calendar-day--today': isToday,
                  'calendar-day--unavailable': !isAvailable,
                  'calendar-day--different-month': !isSameMonth,
                  'calendar-day--check-in': isCheckIn,
                  'calendar-day--check-out': isCheckOut,
                  'calendar-day--between-checks': isBetweenChecks,
              }"
      @click="hijackClick"
  >
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
      isCheckIn: Boolean,
      isCheckOut: Boolean,
      isBetweenChecks: Boolean,
    },
    methods: {
      hijackClick () {
        this.$emit('inner-click')
      }
    }
  }
</script>

<style lang=scss>
  .calendar-day {
    @include flex-center;
    position: relative;
    color: black;
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;
    cursor: pointer;

    &--today {
      > .calendar-day__date {
        color: #00dbb1;
        border: 2px solid #00dbb1;
      }

    }

    &--unavailable {
      color: #b6b6b6;
      cursor: default;
    }

    &--different-month {
      color: #737373;
      cursor: default;
    }

    &--check-in, &--check-out {
      color: white;
      background: #92fef5;

      > .calendar-day__date {
        background: #00dbb1;
      }
    }

    &--check-in {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }

    &--check-out {
      border-bottom-right-radius: 50%;
      border-top-right-radius: 50%;
    }

    &--between-checks {
      color: #00dbb1;
      background: #92fef5;
    }
  }

  .calendar-day__date {
    @include flex-center;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
  }
</style>

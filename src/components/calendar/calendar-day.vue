<template>
  <div class="calendar-day"
       :class="{  'calendar-day--today': isToday,
                  'calendar-day--unavailable': !isAvailable,
                  'calendar-day--different-month': !isSameMonth
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
      border-radius: 50%;
      border: 2px solid #00dbb1;
    }

    &--unavailable {
      color: #b6b6b6;
      cursor: default;
    }

    &--different-month {
      color: #737373;
      cursor: default;
    }
  }

  .calendar-day__date {
    position: absolute;
  }
</style>

<template>
  <div class="app-booking">
    <app-calendar/>
  </div>
</template>

<script>
  import AppCalendar from '@/components/app-calendar'
  export default {
    name: 'app-booking',
    components: { AppCalendar },
    props: {
      pricePerDay: Number,
      rating: {
        average: Number,
        amount: Number,
      },
      availableDates: Array,
    }
  }
</script>

<style lang=scss>

</style>

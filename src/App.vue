<template>
  <div class="app">
    <app-booking/>
  </div>
</template>

<script>
  import AppBooking from '@/components/app-booking'

  export default {
    name: 'booking-calendar',
    components: { AppBooking },
  }
</script>

<style lang="scss">
  @import '@/assets/style/global.scss';

  .app {
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>

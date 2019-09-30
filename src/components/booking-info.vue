<template>
  <div class="booking-info">
    <span class="booking-info__nights">{{ `${nightsChecked} Night${nightsChecked > 0 ? 's': '' }` }}</span>
    <span class="booking-info__total-price">{{ pricePerDay * nightsChecked }} zł</span>
  </div>
</template>

<script>
  export default {
    name: 'booking-info',
    props: {
      pricePerDay: Number,
      nightsChecked: Number,
    }
  }
</script>

<style lang=scss>
  .booking-info {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }

  .booking-info__nights {
    margin-bottom: 0.5rem;
  }
</style>

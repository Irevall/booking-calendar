<template>
  <div class="booking-header">
    <span class="booking-header__price">{{ pricePerDay }} zł</span>
    <div class="booking-header__rating">
      <div class="booking-header__stars">
        <font-awesome-icon class="booking-header__empty-star" icon="star" v-for="n in 5" :key="`empty-star-${n}`"/>

        <div class="booking-header__stars-filling" :style="{ '--stars-ratio': starFillRatio }">
          <font-awesome-icon class="booking-header__filled-star" icon="star" v-for="n in 5" :key="`filled-star-${n}`"/>
        </div>
      </div>

      <span class="booking-header__vote-count">{{ voteCount }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'booking-header',
    props: {
      pricePerDay: Number,
      rating: Number,
      voteCount: Number,
    },
    computed: {
      starFillRatio () {
        return this.rating / 5
      }
    },
  }
</script>

<style lang=scss>
  .booking-header {
    display: flex;
    flex-direction: column;
  }

  .booking-header__price {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .booking-header__rating {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
  }

  .booking-header__stars {
    @include flex-center;
    position: relative;
  }

  .booking-header__empty-star, .booking-header__filled-star {
    color: #b4b4b4;
  }

  .booking-header__stars-filling {
    --stars-ratio: 1;

    display: flex;
    position: absolute;
    left: 0;
    filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(130deg) saturate(600%);
    width: calc(var(--stars-ratio) * 100%);
    overflow: hidden;
  }

  .booking-header__vote-count {
    margin-left: 0.5rem;
    font-weight: 800;
    padding-top: 2px;
  }
</style>

<template>
  <div class="app-booking">
    <!-- TODO: separate component-->
    <div class="app-booking__header">
      <span class="app-booking__price">{{ pricePerDay }} zł</span>
      <div class="app-booking__rating">
        <div class="app-booking__stars">
          <font-awesome-icon class="app-booking__empty-star" icon="star" v-for="n in 5" :key="`empty-star-${n}`"/>

          <div class="app-booking__stars-filling" :style="{ '--stars-ratio': starFillRatio }">
            <font-awesome-icon class="app-booking__filled-star" icon="star" v-for="n in 5" :key="`filled-star-${n}`"/>
          </div>
        </div>

        <span class="app-booking__vote-count">{{ rating.amount }}</span>
      </div>
    </div>

    <div class="app-booking__separator"></div>

    <!-- TODO: separate component-->
    <span class="app-booking_dates-label">Dates</span>
    <div class="app-booking__dates">
      <span class="app-booking__check app-booking__check--in">Check In</span>
      <font-awesome-icon class="app-booking__check-separator" icon="angle-double-right"/>
      <span  class="app-booking__check app-booking__check--out">Check Out</span>

      <app-calendar class="app-booking__calendar"/>
    </div>

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
    },
    computed: {
      starFillRatio () {
        return this.rating.average / 5
      }
    }
  }
</script>

<style lang=scss>
  .app-booking {
    display: flex;
    flex-direction: column;
    border: 1px solid #b4b4b4;
    padding: 1rem;
  }

  .app-booking__header {
    display: flex;
    flex-direction: column;
  }

  .app-booking__price {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .app-booking__rating {
    display: flex;
    font-size: 0.75rem;
  }

  .app-booking__stars {
    @include flex-center;
    position: relative;
  }

  .app-booking__empty-star, .app-booking__filled-star {
    color: #b4b4b4;
  }

  .app-booking__stars-filling {
    --stars-ratio: 1;

    display: flex;
    position: absolute;
    left: 0;
    filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(130deg) saturate(600%);
    width: calc(var(--stars-ratio) * 100%);
    overflow: hidden;
  }

  .app-booking__vote-count {
    margin-left: 0.5rem;
    font-weight: 600;
  }

  .app-booking__separator {
    margin: 1rem 0;
    height: 1px;
    width: 100%;
    background: #b4b4b4;
  }

  .app-booking__dates {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #b4b4b4;
    padding: 0.5rem;
  }

  .app-booking__check {

    padding: 2px 0.25rem;
    cursor: pointer;

    &--active {
      background: #a1d9d6;
    }

    &--in {
      padding-right: 1.5rem;
    }

    &--out {
      padding-left: 1.5rem;
    }
  }

  .app-booking__check-separator {
    margin: 0 0.5rem;
  }

  .app-booking__calendar {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
  }
</style>

export class Booking {
  constructor (raw) {
    this.pricePerDay = raw.pricePerDay
    this.rating = raw.rating
    this.voteCount = raw.voteCount
    this.availableDates = raw.availableDates
  }
}

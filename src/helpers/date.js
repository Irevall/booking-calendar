export function compareDates (date1, date2) {
  if (!date1 || !date2) return false

  console.log(date1)
  console.log(date2)
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear()

}

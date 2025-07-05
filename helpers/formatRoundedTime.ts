/**
 * Round a Date to the nearest minute (up, down, or nearest) and return a formatted time string.
 *
 * @param date - The original Date object to format.
 * @param direction - Direction to round the date: 'up', 'down', or 'nearest'. Defaults to 'nearest'.
 * @param locale - Optional locale or list of locales for formatting.
 * @returns A formatted time string (e.g., "12:05 PM").
 */
export function formatRoundedTime(
  date: Date,
  direction: 'up' | 'down' | 'nearest' = 'nearest',
  locale?: string | string[]
): string {
  const time = date.getTime()
  const minuteMs = 60000
  let roundedTime: number

  switch (direction) {
    case 'up':
      roundedTime = Math.ceil(time / minuteMs) * minuteMs
      break
    case 'down':
      roundedTime = Math.floor(time / minuteMs) * minuteMs
      break
    case 'nearest':
    default:
      roundedTime = Math.round(time / minuteMs) * minuteMs
      break
  }

  const roundedDate = new Date(roundedTime)

  return roundedDate.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

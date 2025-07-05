/**
 * Formats a date as a relative time string compared to the current time.
 *
 * @param date - The date to compare to now. If null or undefined, returns an empty string.
 * @returns A string like "in 2 hrs", "3 min ago", etc.
 */
export function formatRelativeTime(date: Date | null | undefined): string {
  try {
    if (!date) throw new Error('No date provided to formatRelativeTime')
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHr = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHr / 24)

    if (Math.abs(diffSec) < 60) {
      return diffSec >= 0 ? `in ${diffSec} sec` : `${-diffSec} sec ago`
    } else if (Math.abs(diffMin) < 60) {
      return diffMin >= 0 ? `in ${diffMin} min` : `${-diffMin} min ago`
    } else if (Math.abs(diffHr) < 24) {
      return diffHr >= 0
        ? `in ${diffHr} hr${diffHr === 1 ? '' : 's'}`
        : `${-diffHr} hr${diffHr === -1 ? '' : 's'} ago`
    } else {
      return diffDay >= 0
        ? `in ${diffDay} day${diffDay === 1 ? '' : 's'}`
        : `${-diffDay} day${diffDay === -1 ? '' : 's'} ago`
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return ''
    }
    console.error('Unknown error in formatRelativeTime')
    return ''
  }
}

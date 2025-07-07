import { useEffect, useState } from 'react'
import { formatRelativeTime } from '~/helpers/formatRelativeTime'

/**
 * Returns a relative time string for a given date, and keeps it updated.
 * @param date The target date
 */
export function useRelativeTime(date: Date | null | undefined): string {
  const [relative, setRelative] = useState(() =>
    date ? formatRelativeTime(date) : ''
  )

  useEffect(() => {
    if (!date) {
      setRelative('')
      return
    }

    function getDelay() {
      const now = new Date()
      const diffMs = Math.abs(date!.getTime() - now.getTime())
      if (diffMs < 60000) return 1000 // < 60 sec: update every second
      if (diffMs < 3600000) return 60000 // < 60 min: update every minute
      return 3600000 // otherwise: update every hour
    }

    setRelative(formatRelativeTime(date))
    const delay = getDelay()
    const id = setInterval(() => setRelative(formatRelativeTime(date)), delay)
    return () => clearInterval(id)
  }, [date])

  return relative
}

export const convertDate = (timestamp) => {
  if (!timestamp) return '-'

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const convertTime = (value) => {
  if (!value) return '-'

  return new Date(value).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export const formatDateTime = (value) => {
  if (!value) return '-'

  return `${convertDate(value)} · ${convertTime(value)}`
}

export const formatRelativeTime = (value) => {
  if (!value) return '-'

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const now = new Date()
  const date = new Date(value)

  const diffMs = date - now

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  const abs = Math.abs(diffMs)

  if (abs < hour) {
    return rtf.format(Math.round(diffMs / minute), 'minute')
  }

  if (abs < day) {
    return rtf.format(Math.round(diffMs / hour), 'hour')
  }

  if (abs < week) {
    return rtf.format(Math.round(diffMs / day), 'day')
  }

  if (abs < month) {
    return rtf.format(Math.round(diffMs / week), 'week')
  }

  if (abs < year) {
    return rtf.format(Math.round(diffMs / month), 'month')
  }

  return rtf.format(Math.round(diffMs / year), 'year')
}

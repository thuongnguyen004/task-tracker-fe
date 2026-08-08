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

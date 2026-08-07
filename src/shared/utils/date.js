export const convertDate = (timestamp) => {
  if (!timestamp) return '-'

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const required = (value, message) => {
  if (value === null || value === undefined || value === '') {
    return message
  }
  return ''
}

export const size = (value, min, max, message) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  const length = String(value).length
  if (length < min || length > max) {
    return message
  }
  return ''
}

export const greaterThan = (value, min, message) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  const num = Number(value)
  if (Number.isNaN(num) || num <= min) {
    return message
  }
  return ''
}

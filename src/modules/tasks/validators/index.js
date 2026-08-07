import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  TICKET_MESSAGE,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '@/shared/constants/ticket-message.js'
import { required, size } from '@/shared/validators/rules.js'

export const validateEditTicket = (form) => {
  const errors = {}
  errors.title =
    required(form.title, TICKET_MESSAGE.TITLE_REQUIRED) ||
    size(form.title, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, TICKET_MESSAGE.TITLE_SIZE)
  errors.description = size(
    form.description,
    DESCRIPTION_MIN_LENGTH,
    DESCRIPTION_MAX_LENGTH,
    TICKET_MESSAGE.DESCRIPTION_SIZE,
  )
  errors.priorityId = required(form.priorityId, TICKET_MESSAGE.PRIORITY_REQUIRED)
  errors.statusId = required(form.statusId, TICKET_MESSAGE.STATUS_REQUIRED)

  if (!errors.title && !errors.description && !errors.priorityId && !errors.statusId) {
    return
  }
  return errors
}

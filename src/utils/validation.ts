import type { Contact, ContactFormErrors, ContactFormValues } from '../types/contact'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9()\-\s]{7,20}$/

export const normalizeEmail = (email: string): string => email.trim().toLowerCase()

export const validateContactForm = (
  values: ContactFormValues,
  contacts: Contact[],
  currentId?: string,
): ContactFormErrors => {
  const errors: ContactFormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required'
  }

  const normalizedEmail = normalizeEmail(values.email)

  if (!emailPattern.test(normalizedEmail)) {
    errors.email = 'Please enter a valid email'
  } else {
    const duplicate = contacts.find(
      (contact) =>
        normalizeEmail(contact.email) === normalizedEmail && contact.id !== currentId,
    )

    if (duplicate) {
      errors.email = 'Email already exists'
    }
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number'
  }

  return errors
}

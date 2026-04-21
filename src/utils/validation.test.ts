import { describe, expect, it } from 'vitest'
import { validateContactForm } from './validation'
import type { Contact, ContactFormValues } from '../types/contact'

const contacts: Contact[] = [
  {
    id: 'a',
    firstName: 'Nina',
    lastName: 'Doe',
    email: 'nina@example.com',
    phone: '+1 555 123 4567',
    company: 'Alpha',
    notes: '',
    tags: ['Client'],
    createdAt: '2026-03-03T10:00:00.000Z',
  },
]

const validValues: ContactFormValues = {
  firstName: 'Rahul',
  lastName: 'Shah',
  email: 'rahul@example.com',
  phone: '+1 555 123 9876',
  company: 'Bravo',
  notes: '',
  tags: ['Vendor'],
}

describe('validateContactForm', () => {
  it('requires first name', () => {
    const errors = validateContactForm({ ...validValues, firstName: '' }, contacts)
    expect(errors.firstName).toBe('First name is required')
  })

  it('rejects duplicate email', () => {
    const errors = validateContactForm({ ...validValues, email: 'NINA@example.com' }, contacts)
    expect(errors.email).toBe('Email already exists')
  })

  it('accepts valid unique contact', () => {
    const errors = validateContactForm(validValues, contacts)
    expect(errors).toEqual({})
  })
})

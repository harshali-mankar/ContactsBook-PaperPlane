import { describe, expect, it } from 'vitest'
import { filterAndSortContacts } from './useContactFilters'
import type { Contact } from '../types/contact'

const contacts: Contact[] = [
  {
    id: '1',
    firstName: 'Asha',
    lastName: 'Verma',
    email: 'asha@delta.com',
    phone: '',
    company: 'Delta',
    notes: '',
    tags: ['Client'],
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    firstName: 'Biren',
    lastName: 'Shah',
    email: 'biren@zeta.com',
    phone: '',
    company: 'Zeta',
    notes: '',
    tags: ['Vendor', 'Client'],
    createdAt: '2026-03-01T00:00:00.000Z',
  },
]

describe('filterAndSortContacts', () => {
  it('filters by search term across company', () => {
    const result = filterAndSortContacts(contacts, 'zeta', [], 'name-asc')
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('2')
  })

  it('supports multi-tag filtering', () => {
    const result = filterAndSortContacts(contacts, '', ['Client', 'Vendor'], 'name-asc')
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('2')
  })

  it('sorts by newest date first', () => {
    const result = filterAndSortContacts(contacts, '', [], 'date-newest')
    expect(result[0]?.id).toBe('2')
  })
})

import { useMemo } from 'react'
import type { Contact, ContactTag } from '../types/contact'

export type SortBy = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest'

const fullName = (contact: Contact): string =>
  `${contact.firstName} ${contact.lastName}`.trim().toLowerCase()

export const filterAndSortContacts = (
  contacts: Contact[],
  searchTerm: string,
  selectedTags: ContactTag[],
  sortBy: SortBy,
): Contact[] => {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filtered = contacts.filter((contact) => {
    const matchesSearch =
      !normalizedSearch ||
      fullName(contact).includes(normalizedSearch) ||
      contact.email.toLowerCase().includes(normalizedSearch) ||
      contact.company.toLowerCase().includes(normalizedSearch)

    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => contact.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  return filtered.sort((a, b) => {
    if (sortBy === 'name-asc') {
      return fullName(a).localeCompare(fullName(b))
    }
    if (sortBy === 'name-desc') {
      return fullName(b).localeCompare(fullName(a))
    }
    if (sortBy === 'date-oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export const useContactFilters = (
  contacts: Contact[],
  searchTerm: string,
  selectedTags: ContactTag[],
  sortBy: SortBy,
): Contact[] =>
  useMemo(
    () => filterAndSortContacts(contacts, searchTerm, selectedTags, sortBy),
    [contacts, searchTerm, selectedTags, sortBy],
  )

import { create } from 'zustand'
import { sampleContacts } from '../data/sampleContacts'
import type { Contact, ContactFormValues } from '../types/contact'

interface ContactsState {
  contacts: Contact[]
  addContact: (values: ContactFormValues) => void
  updateContact: (id: string, values: ContactFormValues) => void
  deleteContact: (id: string) => void
}

const createId = (): string => crypto.randomUUID()

export const useContactsStore = create<ContactsState>((set) => ({
  // Zustand keeps local client state simple here with no boilerplate.
  contacts: sampleContacts,
  addContact: (values) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        { id: createId(), createdAt: new Date().toISOString(), ...values },
      ],
    })),
  updateContact: (id, values) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...values } : contact,
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}))

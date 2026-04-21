export type ContactTag = 'Client' | 'Vendor' | 'Personal' | 'Partner'

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  notes: string
  tags: ContactTag[]
  createdAt: string
}

export interface ContactFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  notes: string
  tags: ContactTag[]
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

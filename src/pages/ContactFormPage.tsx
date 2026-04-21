import { useMemo } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { ContactForm } from '../components/ContactForm'
import { useContactsStore } from '../store/contactsStore'
import type { ContactFormValues } from '../types/contact'

export const ContactFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const contacts = useContactsStore((state) => state.contacts)
  const addContact = useContactsStore((state) => state.addContact)
  const updateContact = useContactsStore((state) => state.updateContact)

  const editingContact = useMemo(
    () => contacts.find((contact) => contact.id === id),
    [contacts, id],
  )

  if (id && !editingContact) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography>Contact not found.</Typography>
        </CardContent>
      </Card>
    )
  }

  const initialValues: ContactFormValues | undefined = editingContact
    ? {
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        email: editingContact.email,
        phone: editingContact.phone,
        company: editingContact.company,
        notes: editingContact.notes,
        tags: editingContact.tags,
      }
    : undefined

  const backTo = editingContact ? `/contacts/${editingContact.id}` : '/'

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Button component={RouterLink} to={backTo} variant="text" sx={{ alignSelf: 'flex-end' }}>
            Back
          </Button>
          <ContactForm
            mode={editingContact ? 'edit' : 'create'}
            contacts={contacts}
            initialValues={initialValues}
            contactId={editingContact?.id}
            onSubmit={(values) => {
              if (editingContact) {
                updateContact(editingContact.id, values)
                navigate(`/contacts/${editingContact.id}`)
                return
              }
              addContact(values)
              navigate('/')
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

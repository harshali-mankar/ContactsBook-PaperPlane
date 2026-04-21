import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useContactsStore } from '../store/contactsStore'

const getInitials = (firstName: string, lastName: string): string =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

export const ContactDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const contact = useContactsStore((state) =>
    state.contacts.find((currentContact) => currentContact.id === id),
  )
  const deleteContact = useContactsStore((state) => state.deleteContact)

  if (!contact) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography>Contact not found.</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              {getInitials(contact.firstName, contact.lastName)}
            </Avatar>
            <div>
              <Typography variant="h5">{`${contact.firstName} ${contact.lastName}`}</Typography>
              <Typography color="text.secondary">{contact.company || 'No company'}</Typography>
            </div>
          </Stack>
          <Divider />
          <Typography>
            <strong>Email:</strong> {contact.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {contact.phone || '-'}
          </Typography>
          <Typography>
            <strong>Notes:</strong> {contact.notes || '-'}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {contact.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Button component={RouterLink} to={`/contacts/${contact.id}/edit`} variant="contained">
              Edit
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                const ok = window.confirm('Delete this contact?')
                if (ok) {
                  deleteContact(contact.id)
                  navigate('/')
                }
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

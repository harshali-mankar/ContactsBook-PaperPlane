import { useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useContactsStore } from '../store/contactsStore'

const getInitials = (firstName: string, lastName: string): string =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

export const ContactDetailPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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
          <Button component={RouterLink} to="/" variant="text" sx={{ alignSelf: 'flex-end' }}>
            Back
          </Button>
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
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
        <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
          <DialogTitle>Delete contact?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {contact.firstName} {contact.lastName}? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                deleteContact(contact.id)
                setIsDeleteDialogOpen(false)
                navigate('/')
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}

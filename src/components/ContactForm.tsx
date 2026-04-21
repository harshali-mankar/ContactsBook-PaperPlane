import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { Contact, ContactFormValues, ContactTag } from '../types/contact'
import { validateContactForm } from '../utils/validation'

const allTags: ContactTag[] = ['Client', 'Vendor', 'Personal', 'Partner']

const defaultValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
  tags: [],
}

interface ContactFormProps {
  mode: 'create' | 'edit'
  contacts: Contact[]
  initialValues?: ContactFormValues
  contactId?: string
  onSubmit: (values: ContactFormValues) => void
}

export const ContactForm = ({
  mode,
  contacts,
  initialValues = defaultValues,
  contactId,
  onSubmit,
}: ContactFormProps) => {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [showDirtyAlert, setShowDirtyAlert] = useState(false)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [initialValues, values],
  )

  const errors = useMemo(
    () => validateContactForm(values, contacts, contactId),
    [contactId, contacts, values],
  )

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return
      }
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    const handlePopState = () => {
      if (!isDirty) {
        return
      }
      const shouldLeave = window.confirm('You have unsaved changes. Leave this page?')
      if (!shouldLeave) {
        window.history.pushState(null, '', window.location.href)
        setShowDirtyAlert(true)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isDirty])

  const handleFieldChange =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const canSubmit = Object.keys(errors).length === 0

  return (
    <Stack spacing={2.5} component="form" onSubmit={(event) => event.preventDefault()}>
      <Typography variant="h5">
        {mode === 'create' ? 'Add Contact' : 'Edit Contact'}
      </Typography>
      {showDirtyAlert && (
        <Alert severity="info" onClose={() => setShowDirtyAlert(false)}>
          Stayed on page to keep your unsaved edits.
        </Alert>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          required
          label="First Name"
          value={values.firstName}
          onChange={handleFieldChange('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={values.lastName}
          onChange={handleFieldChange('lastName')}
          fullWidth
        />
      </Stack>
      <TextField
        label="Email"
        value={values.email}
        onChange={handleFieldChange('email')}
        error={Boolean(errors.email)}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Phone"
        value={values.phone}
        onChange={handleFieldChange('phone')}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        fullWidth
      />
      <TextField
        label="Company"
        value={values.company}
        onChange={handleFieldChange('company')}
        fullWidth
      />
      <TextField
        label="Notes"
        value={values.notes}
        onChange={handleFieldChange('notes')}
        multiline
        minRows={3}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          multiple
          value={values.tags}
          label="Tags"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, tags: event.target.value as ContactTag[] }))
          }
        >
          {allTags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) {
              onSubmit(values)
            }
          }}
        >
          {mode === 'create' ? 'Create Contact' : 'Save Changes'}
        </Button>
      </Box>
    </Stack>
  )
}

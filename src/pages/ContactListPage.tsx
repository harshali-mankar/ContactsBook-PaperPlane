import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useContactsStore } from '../store/contactsStore'
import type { ContactTag } from '../types/contact'
import { useContactFilters, type SortBy } from '../hooks/useContactFilters'

const filterTags: ContactTag[] = ['Client', 'Vendor', 'Personal', 'Partner']

export const ContactListPage = () => {
  const contacts = useContactsStore((state) => state.contacts)
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<ContactTag[]>([])
  const [sortBy, setSortBy] = useState<SortBy>('name-asc')
  const filteredContacts = useContactFilters(contacts, search, selectedTags, sortBy)

  const noDataMessage = useMemo(() => {
    if (contacts.length === 0) {
      return 'No contacts found. Add your first contact to get started.'
    }
    return 'No contacts match your current search/filter.'
  }, [contacts.length])

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Typography variant="h4">Contacts Book</Typography>
        <Button variant="contained" component={RouterLink} to="/contacts/new">
          Add Contact
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          label="Search by name, email, or company"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="filter-tags">Filter Tags</InputLabel>
          <Select
            labelId="filter-tags"
            multiple
            value={selectedTags}
            label="Filter Tags"
            onChange={(event) => setSelectedTags(event.target.value as ContactTag[])}
          >
            {filterTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="sort-by">Sort</InputLabel>
          <Select
            labelId="sort-by"
            value={sortBy}
            label="Sort"
            onChange={(event) => setSortBy(event.target.value as SortBy)}
          >
            <MenuItem value="name-asc">Name A-Z</MenuItem>
            <MenuItem value="name-desc">Name Z-A</MenuItem>
            <MenuItem value="date-newest">Date Added (Newest)</MenuItem>
            <MenuItem value="date-oldest">Date Added (Oldest)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredContacts.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography>{noDataMessage}</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Box sx={{ display: { xs: 'none', md: 'block' }, overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    hover
                    component={RouterLink}
                    to={`/contacts/${contact.id}`}
                    sx={{
                      textDecoration: 'none',
                      '& td': { borderBottom: '1px solid', borderColor: 'divider' },
                    }}
                  >
                    <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {contact.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Stack spacing={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                variant="outlined"
                component={RouterLink}
                to={`/contacts/${contact.id}`}
                sx={{ textDecoration: 'none' }}
              >
                <CardContent>
                  <Typography variant="h6">{`${contact.firstName} ${contact.lastName}`}</Typography>
                  <Typography variant="body2">{contact.email}</Typography>
                  <Typography variant="body2">{contact.company}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    {contact.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  )
}

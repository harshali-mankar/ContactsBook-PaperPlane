import { Container } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ContactDetailPage } from './pages/ContactDetailPage'
import { ContactFormPage } from './pages/ContactFormPage'
import { ContactListPage } from './pages/ContactListPage'

const App = () => (
  <Container maxWidth="lg" sx={{ py: 3 }}>
    <Routes>
      <Route path="/" element={<ContactListPage />} />
      <Route path="/contacts/new" element={<ContactFormPage />} />
      <Route path="/contacts/:id" element={<ContactDetailPage />} />
      <Route path="/contacts/:id/edit" element={<ContactFormPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Container>
)

export default App

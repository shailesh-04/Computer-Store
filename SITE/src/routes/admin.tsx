import UserPage from '@/pages/admin/UserPage'
import ComputerPage from '@/pages/Computer'
import NotFound from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

export default function Admin() {
  return (
    <Routes>
        {/* index route */}
        <Route path="/" element={<UserPage />} />
        <Route path="/computers" element={<ComputerPage />} />    
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

import EditProfile from '@/pages/EditProfile'
import NotFound from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

export default function Users() {
  return (
    <Routes>
        <Route path='/edit' element={<EditProfile />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

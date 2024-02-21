import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error404Page from '../layouts/Error404Page'
import DashboardNavbar from '../components/Admin/DashboardNavbar'
import DashboardPage from './Admin/Dashboard/DashboardPage'
import Appointments from './Admin/Dashboard/Appointments'
import Doctors from './Admin/Dashboard/Doctors'
import Payments from './Admin/Dashboard/Payments'
import Notifications from './Admin/Dashboard/Notifications'
import DashboardProfile from './Admin/Dashboard/DashboardProfile'
import Account from './Admin/Dashboard/Account'


const AdminDashboardView = () => {
  return (
    <>
        <DashboardNavbar content={
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<DashboardProfile />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<Error404Page />} />
            </Routes>
        } />
    </>
  )
}

export default AdminDashboardView
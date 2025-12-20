import React, { useContext } from 'react'
import AdminStatics from '../AdminPages/AdminStatics'
import { AllContext } from '../Provider/AuthProvider'

const AdminWarp = () => {

    const { user, role } = useContext(AllContext)

    if (!user || !role) return null

    return (
        <>  <AdminStatics key={`${user.email}-${role}`} /> </>
    )
}

export default AdminWarp
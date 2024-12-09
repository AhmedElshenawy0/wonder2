import CreateUserForm from '@/components/admin/users/CreateUserForm'
import React from 'react'

const page = () => {
  return (
    <div className="">
    <h3 className="p-3 text-lg font-semibold text-[#5d7186]">
      Create User
    </h3>
    <CreateUserForm/>
    
  </div>
  )
}

export default page
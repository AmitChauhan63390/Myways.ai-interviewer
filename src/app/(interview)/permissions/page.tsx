import InstructionScreen from '@/components/instruction-screen'
import Navbar from '@/components/navbar'
import PermissionScreen from '@/components/permission-screen'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div>
            <Navbar/>
        </div>
        
            <PermissionScreen/>
        

    </div>
  )
}

export default page
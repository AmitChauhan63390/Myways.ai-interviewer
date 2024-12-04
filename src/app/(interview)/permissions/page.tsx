import InstructionScreen from '@/components/instruction-screen'
import Navbar from '@/components/navbar'
import PermissionScreen from '@/components/permission-screen'
import React from 'react'
import { PermissionProvider } from '../../../../Contexts/PermissionContexts'

const page = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div>
            <Navbar/>
        </div>
        <PermissionProvider>

            <PermissionScreen/>
        </PermissionProvider>
        
        

    </div>
  )
}

export default page
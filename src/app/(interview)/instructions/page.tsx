import InstructionScreen from '@/components/instruction-screen'
import Navbar from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div>
            <Navbar/>
        </div>
        
            <InstructionScreen/>
        

    </div>
  )
}

export default page
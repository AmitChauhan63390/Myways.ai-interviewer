import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[56px] bg-white min-w-screen items-center flex justify-between px-4'>
        <Image src="https://framerusercontent.com/images/gBt7h3FkIxpAujo0vWLNN7U0Y.png?scale-down-to=512" width={100} height={100} alt="" />

    </div>
  )
}

export default Navbar
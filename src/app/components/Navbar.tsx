"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-orange-200 p-8 flex justify-between'>
      <p className='uppercase text-xl font-extrabold'>Navbar</p>
      <button className='uppercase text-xl font-extrabold' onClick={() => signOut({ redirect: true, callbackUrl: '/' })} >Log Out</button>
    </div>
  )
}

export default Navbar
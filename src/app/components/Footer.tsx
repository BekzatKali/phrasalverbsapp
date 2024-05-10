"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-700 p-8 text-white uppercase text-xl font-extrabold flex justify-between items-center'>
      <div>
        Footer
      </div>
      <button className='uppercase text-xl font-extrabold' onClick={() => signOut({ redirect: true, callbackUrl: '/' })} >Log Out</button>
    </div>
  )
}

export default Footer
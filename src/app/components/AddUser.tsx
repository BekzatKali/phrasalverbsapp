"use client"

import { addUser } from '@/lib/actions'
import Link from 'next/link'
import React, { useRef } from 'react'

const AddUser = () => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <div className='flex flex-col md:flex md:justify-between md:flex-row md:items-center md:gap-4 gap-8 md:h-[60vh]'>
        <div className='md:flex-1'>
          <form ref={ref} action={async (formData) => {
          await addUser(formData);
          ref.current?.reset();
          }} className="flex flex-col gap-4 ring-1 p-4 md:max-w-[600px] max-w-full">
              <input type="text" name="username" placeholder="Username" className='outline-none bg-orange-200 p-2 placeholder-black' required/>
              <input type="email" name="email" placeholder="Email" className='outline-none bg-orange-200 p-2 placeholder-black' required/>
              <input type="password" name="password" placeholder="Password" className='outline-none bg-orange-200 p-2 placeholder-black' required/>
              <select name="isAdmin" className='outline-none bg-orange-200 p-2' required>
                <option value="isAdmin" defaultValue={"Is Admin?"}>
                  Is Admin?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <button className='bg-orange-200 p-4 hover:bg-orange-300 duration-500'>Add</button>
          </form>
        </div>
        <div className='flex flex-col'>
          <Link href="/users" className='bg-orange-200 p-4 hover:bg-orange-300 duration-500 block'>
            See All The Users
          </Link>
          <Link href="/phrasalverbs" className='bg-orange-200 p-4 hover:bg-orange-300 duration-500 block'>
            See All The Phrasal Verbs
          </Link>
        </div>
    </div>
  )
}

export default AddUser
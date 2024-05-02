"use client"

import { addUser } from '@/lib/actions'
import Link from 'next/link'
import React, { useRef } from 'react'

const AddUser = () => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <div className='flex justify-between items-center'>
        <div className='flex-1'>
          <h1 className='mb-4'>Add User</h1>
          <form ref={ref} action={async (formData) => {
          await addUser(formData);
          ref.current?.reset();
          }} className="flex flex-col gap-4 ring-1 p-4 max-w-[600px]">
              <input type="text" name="username" placeholder="Username" className='outline-none bg-orange-200 p-2 placeholder-black'/>
              <input type="email" name="email" placeholder="Email" className='outline-none bg-orange-200 p-2 placeholder-black'/>
              <input type="password" name="password" placeholder="Password" className='outline-none bg-orange-200 p-2 placeholder-black'/>
              <select name="isAdmin" className='outline-none bg-orange-200 p-2'>
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
          <Link href="/users" className='bg-orange-200 p-4 hover:bg-orange-300 duration-500'>
            See All The Users
          </Link>
          <Link href="/phrasalverbs" className='bg-orange-200 p-4 hover:bg-orange-300 duration-500'>
            See All The Phrasal Verbs
          </Link>
        </div>
    </div>
  )
}

export default AddUser
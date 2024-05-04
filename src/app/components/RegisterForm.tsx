import { userRegistration } from '@/lib/actions'
import React from 'react'
import Link from "next/link"

const RegisterForm = () => {
  return (
    <div className='max-w-[500px] mx-auto'>
        <h1 className='uppercase text-xl font-extrabold text-center mb-4'>Register</h1>
        <form action={userRegistration} className='ring-1 flex flex-col p-4 rounded-md gap-4'>
            <input type="text" name="username" placeholder='Username' className='outline-none p-2 rounded-md'/>
            <input type="email" name="email" placeholder='Email' className='outline-none p-2 rounded-md' />
            <input type="password" name="password" placeholder='Password' className='outline-none p-2 rounded-md'/>
            <button className='outline-none bg-orange-200 p-2 hover:bg-orange-300 duration-500 rounded-md'>Register</button>
            <div className='flex gap-1 ml-auto'>
                <span>Have an account?</span>
                <Link className='text-blue-600 font-bold' href='/'>Login</Link>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm
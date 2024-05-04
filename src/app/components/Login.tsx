"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Link from "next/link"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      if (res?.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className='max-w-[500px] mx-auto'>
        <h1 className='uppercase text-xl font-extrabold text-center mb-4'>Login</h1>
        <form onSubmit={handleSubmit} className='ring-1 flex flex-col p-4 rounded-md gap-4'>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none p-2 rounded-md' />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none p-2 rounded-md' />
          {error}
          <button className='outline-none bg-orange-200 p-2 hover:bg-orange-300 duration-500 rounded-md'>Login</button>
          <div className='flex gap-1 ml-auto'>
            <span>Don't have an account?</span>
            <Link className='text-blue-600 font-bold' href='/register'>Register</Link>
          </div>
        </form>
    </div>
  )
}

export default Login
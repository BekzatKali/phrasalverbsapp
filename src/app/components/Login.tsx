"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      {error}
      <button>Login</button>
    </form>
  )
}

export default Login
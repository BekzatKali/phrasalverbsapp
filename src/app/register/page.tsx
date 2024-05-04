import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <RegisterForm />
  )
}

export default RegisterPage
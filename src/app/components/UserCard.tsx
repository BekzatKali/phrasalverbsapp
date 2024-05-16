import { deleteUser } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

type UserCardProps = {
    id: string;
    username: string;
    email: string;
    isAdmin: string;
    createdAt: string;
}

const UserCard = async ({id, username, email, isAdmin, createdAt}: UserCardProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const isCurrentUser = userId === id;


  return (
    <div className='ring-1 p-4 flex flex-col gap-6 rounded-md'>
        <div className='flex flex-col gap-1'>
          <p><span className='font-bold'>User Id:</span> {id}</p>
          <p><span className='font-bold'>Username:</span> {username}</p>
          <p><span className='font-bold'>Email:</span> {email}</p>
          <p><span className='font-bold'>Is Admin:</span> {isAdmin}</p>
          <p><span className='font-bold'>Created At:</span> {createdAt.slice(4, 15)}</p>
        </div>
        <div className='flex gap-2'>
            <Link href={`/users/${id}`} className='bg-green-600 px-4 py-2 text-white hover:bg-green-700 duration-500 rounded-md'>Edit</Link>
            <form action={deleteUser}>
            <input type="hidden" name="id" value={id}/>
            <button disabled={userId === id} className={`${isCurrentUser ? 'bg-gray-400 rounded-md text-gray-600 cursor-not-allowed px-4 py-2' : 'bg-red-400 text-white px-4 py-2 hover:bg-red-600 duration-500 rounded-md'}`}>Delete</button>
            </form>
        </div>
    </div>
  )
}

export default UserCard
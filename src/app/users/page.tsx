import { fetchUsers } from '@/lib/actions'
import React from 'react'
import UserCard from '../components/UserCard';

type UserType = {
    _id: string;
    username: string;
    email: string;
    isAdmin: string;
    createdAt: string;
}

const UsersPage = async () => {
  const users = await fetchUsers();
  console.log("users", users);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {users.map((user: UserType) => (
            <UserCard 
                id={user._id.toString()}
                username={user.username}
                email={user.email}
                isAdmin={user.isAdmin}
                createdAt={user.createdAt.toString()}
            />
        ))}
    </div>

  )
}

export default UsersPage
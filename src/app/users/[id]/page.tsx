import { fetchUser, updateUser } from '@/lib/actions';
import React from 'react'

const SingleUser = async ({ params }: any) => {

  const { id } = params;
  const user = await fetchUser(id);
  
  return (
    <form action={updateUser} className='flex flex-col gap-4 ring-1 p-4'>
        <input type="hidden" name="id" value={user.id}/>
        <input type="text" name="username" placeholder={user.username} className='outline-none bg-orange-200 p-2 placeholder-black'/>
        <input type="email" name="email" placeholder={user.email} className='outline-none bg-orange-200 p-2 placeholder-black'/>
        <input type="password" name="password" placeholder="Update Password" className='outline-none bg-orange-200 p-2 placeholder-black'/>
        <select name="isAdmin" className='outline-none bg-orange-200 p-2 placeholder-black'>
            <option value="isAdmin" defaultValue={user.isAdmin}>
              Is Admin?
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <button className='bg-orange-200 p-4 hover:bg-orange-300 duration-500'>Update User</button>
    </form>
  )
}

export default SingleUser
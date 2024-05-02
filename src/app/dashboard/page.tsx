import React from 'react'
import AddPhrasalVerb from '../components/AddPhrasalVerb'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AddUser from '../components/AddUser';
import PhrasalVerbsWrapper from '../components/PhrasalVerbsWrapper';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.isAdmin === "Yes";
  const userId = session?.user?.id;

  return (
    <div>
      {isAdmin ? <AddUser /> : 
      (
        <div className='flex flex-col gap-4'>
          <AddPhrasalVerb userId={userId}/>
          <PhrasalVerbsWrapper />
        </div>
      )}
    </div>
  )
}

export default Dashboard
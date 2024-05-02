import React from 'react'
import PhrasalVerbCard from './PhrasalVerbCard'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getPhrasalVerbsByUserId } from '@/lib/actions';

// type PhrasalVerbsWrapperProps = {
//     id: string;
//     phrasalVerb: string,
//     example: string
// }

const PhrasalVerbsWrapper = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id 
  const phrasalVerbs = await getPhrasalVerbsByUserId({id});
  console.log("here ww", phrasalVerbs);
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {phrasalVerbs.map((item) => (
            <PhrasalVerbCard 
                key={item._id.toString()}
                id={item._id.toString()}
                phrasalVerb={item.phrasalVerb}
                example={item.example}
            />
        ))}
    </div>
  )
}

export default PhrasalVerbsWrapper
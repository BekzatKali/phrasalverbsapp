import React from 'react'
import { deletePhrasalVerbById } from '@/lib/actions';
import EditPhrasalVerb from './EditPhrasalVerb';
import Favorites from './Favorites';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

type PhrasalVerbCardProps = {
  id: string,
  phrasalVerb: string,
  example: string,
  createdBy?: string
  createdAt?: string
}

const PhrasalVerbCard = async ({ id, phrasalVerb, example, createdBy, createdAt }: PhrasalVerbCardProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id 
  const isUser = session?.user?.isAdmin === "No";

  return (
    <div className='ring-1 p-2 flex flex-col justify-between'>
      <div className='h-full'>
          <div className='flex justify-between gap-2 h-full max-[405px]:flex-col'>
            <div className='flex-1'>
              <EditPhrasalVerb 
                id={id}
                phrasalVerb={phrasalVerb}
                example={example}
                createdBy={createdBy}
              />
            </div>
            <div className='flex gap-2 mt-auto flex-col'>
              {isUser && <div className='flex justify-center mb-2'>
                <Favorites 
                  id={id}
                  userId={userId}
                  phrasalVerb={phrasalVerb}
                  example={example}
                />  
              </div>}   
              <form action={deletePhrasalVerbById}>
                <input type="hidden" name="id" value={id}/>
                <button className='bg-red-400 px-4 py-2 text-white hover:bg-red-600 duration-500 rounded-md'>
                  Delete
                </button>
              </form>
            </div>
          </div>
      </div>
      <div>
         {createdBy ? (
           <>
             <div className='flex gap-1 mt-2'>
               Added By: <p>{createdBy}</p>
             </div>
             <div className='flex gap-1'>
               Added At: <p>{createdAt?.toString().slice(4, 15)}</p>
             </div>
           </>
         ) : null}
      </div>
    </div>
  )
}

export default PhrasalVerbCard
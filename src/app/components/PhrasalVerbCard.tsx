import React from 'react'
import { deletePhrasalVerbById } from '@/lib/actions';
import EditPhrasalVerb from './EditPhrasalVerb';

type PhrasalVerbCardProps = {
  id: string,
  phrasalVerb: string,
  example: string
}

const PhrasalVerbCard = async ({ id, phrasalVerb, example}: PhrasalVerbCardProps) => {
  
  return (
    <div className='ring-1 p-2 flex justify-between gap-2'>
      <div className='flex-1'>
        <EditPhrasalVerb 
          id={id}
          phrasalVerb={phrasalVerb}
          example={example}
        />
      </div>
      <div className='flex gap-2 mt-auto'>     
        <form action={deletePhrasalVerbById}>
          <input type="hidden" name="id" value={id}/>
          <button className='bg-red-400 px-4 py-2 text-white hover:bg-red-600 duration-500 rounded-md'>
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}

export default PhrasalVerbCard
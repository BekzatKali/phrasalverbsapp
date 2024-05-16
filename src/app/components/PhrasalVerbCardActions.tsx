"use client"

import React from 'react'
import Favorites from './Favorites'
import { deletePhrasalVerbById } from '@/lib/actions'
import { usePhrasalVerbsInfoContext } from '../сontext/Provider'

type PhrasalVerbCardActionsProps = {
    id: string,
    userId: string,
    phrasalVerb: string,
    example: string,
    isUser: boolean,
}

const PhrasalVerbCardActions = ({ id, userId, phrasalVerb, example, isUser }: PhrasalVerbCardActionsProps) => {

  const { removePhrasalVerb } = usePhrasalVerbsInfoContext();

  const handleClick = async () => {
    await deletePhrasalVerbById(id);
    removePhrasalVerb(id)
  }

  return (
    <div className='flex gap-2 mt-auto flex-col max-[405px]:flex max-[405px]:flex-row-reverse max-[405px]:justify-between max-[405px]:items-center'>
        {isUser && <div className='flex justify-center max-[405px]:justify-start mb-2 max-[405px]:mb-0'>
          <Favorites
            id={id}
            userId={userId}
            phrasalVerb={phrasalVerb}
            example={example}
          />  
        </div>}   
        <div onClick={handleClick}>
          <button className='bg-red-400 px-4 py-2 text-white hover:bg-red-600 duration-50  rounded-md'>
            Delete
          </button>
        </div>
    </div>
  )
}

export default PhrasalVerbCardActions
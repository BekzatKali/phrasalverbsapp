"use client"

import { addPhrasalVerb } from '@/lib/actions'
import React from 'react'
import { useRef } from 'react'

const AddPhrasalVerb = ({ userId }: {userId: string}) => {
  const ref = useRef<HTMLFormElement>(null)
  
  return (
    <div className='flex flex-col gap-4'>
        <form ref={ref} action={async (formData) => {
          await addPhrasalVerb(formData);
          ref.current?.reset();
        }} className='flex flex-col ring-1 min-w-full md:min-w-[600px] mx-auto p-4 gap-4'>
            <input type="text" name="phrasalVerb" placeholder="Enter Phrasal Verb" className='outline-none bg-orange-200 p-2 placeholder-black' required/>
            <input type="text" name="example" placeholder="Enter Example" className='outline-none bg-orange-200 p-2 placeholder-black' required/>
            <input type="hidden" name="userId" value={userId} />
            <button className='outline-none bg-orange-200 p-2 hover:bg-orange-300 duration-500'>Add</button>
        </form>
    </div>
  )
}

export default AddPhrasalVerb
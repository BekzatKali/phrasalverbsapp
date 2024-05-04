import { fetchUser, getAllPhrasalVerbs } from '@/lib/actions'
import React from 'react'
import PhrasalVerbCard from '../components/PhrasalVerbCard';

const PhrasalVerbsPage = async () => {
  const phrasalVerbs = await getAllPhrasalVerbs();
  
  return (
    <div>
        <h1 className='font-bold mb-4'>All The Phrasal Verbs</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {phrasalVerbs.map((item) => (
                <PhrasalVerbCard 
                    id={item.id.toString()}
                    phrasalVerb={item.phrasalVerb}
                    example={item.example}
                    createdBy={item?.user?.email}
                    createdAt={item.createdAt}
                />
            ))}
        </div>
    </div>
  )
}

export default PhrasalVerbsPage
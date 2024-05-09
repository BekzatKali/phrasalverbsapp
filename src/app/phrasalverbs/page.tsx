import { fetchUser, getAllPhrasalVerbs } from '@/lib/actions'
import React from 'react'
import PhrasalVerbCard from '../components/PhrasalVerbCard';

const PhrasalVerbsPage = async () => {
  const phrasalVerbs = await getAllPhrasalVerbs();
  console.log(phrasalVerbs)
  
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {phrasalVerbs.map((item) => (
                <PhrasalVerbCard 
                    key={item._id.toString()}
                    id={item._id.toString()}
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
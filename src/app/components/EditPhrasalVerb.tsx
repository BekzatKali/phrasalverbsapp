"use client"

import { updatePhrasalVerb } from '@/lib/actions'
import React, { useState } from 'react'

type EditPhrasalVerbProps = {
  id: string,
  phrasalVerb: string,
  example: string,
  createdBy?: string
}

const EditPhrasalVerb = ({ id, phrasalVerb, example, createdBy }: EditPhrasalVerbProps) => {
  const [edited, setEdited] = useState(false);
  const [initialPhrasalVerb, setInitialPhrasalVerb] = useState(phrasalVerb);
  const [initialExample, setInitialExample] = useState(example);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePhrasalVerb({
      id,
      phrasalVerb: initialPhrasalVerb,
      example: initialExample
    });

    setEdited(false);
  }

  return (
        <div className={`${edited ? "flex flex-col gap-2 h-full" : "flex flex-col justify-between h-full"}`}>
            {!edited ? (
              <div className='mb-2'>
                <p className='uppercase font-bold'>{phrasalVerb}</p>
                <p>{example.slice(0,1).toUpperCase() + example.slice(1)}</p>
              </div>
            ) : (
              <div className='mt-auto'>
                <form className='flex flex-col gap-2'>
                  <input type="hidden" name="id" value={id} />
                  <input className='ring-1 p-1 outline-none' type="text" name="phrasalVerb" value={initialPhrasalVerb} onChange={(e) => setInitialPhrasalVerb(e.target.value)} />
                  <input className='ring-1 p-1 outline-none' type="text" name="example" value={initialExample} onChange={(e) => setInitialExample(e.target.value)} />
                </form> 
              </div>
            )}
            <div className='mt-auto flex gap-2'>
              {edited && <button onClick={handleSubmit} type="submit" className='bg-green-600 px-4 py-2 text-white hover:bg-green-700 duration-500 rounded-md'>
                  Update
              </button>}
              <button onClick={() => setEdited((prev) => !prev)} className='bg-green-600 px-4 py-2 text-white hover:bg-green-700 duration-500 rounded-md mt-auto'>
                  {!edited ? "Edit" : "Cancel"}
              </button>
            </div>
            {/* {createdBy ? (<div className='flex gap-1 mt-2'>
              Added By: <p>{createdBy}</p>
            </div>) : null} */}
        </div>
  )
}

export default EditPhrasalVerb












// "use client"

// import { updatePhrasalVerb } from '@/lib/actions'
// import React, { useState } from 'react'

// type EditPhrasalVerbProps = {
//   id: string,
//   phrasalVerb: string,
//   example: string
// }

// const EditPhrasalVerb = ({ id, phrasalVerb, example }: EditPhrasalVerbProps) => {
//   const [edited, setEdited] = useState(false);
//   const [initialPhrasalVerb, setInitialPhrasalVerb] = useState(phrasalVerb);
//   const [initialExample, setInitialExample] = useState(example);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     updatePhrasalVerb({
//       id,
//       phrasalVerb: initialPhrasalVerb,
//       example: initialExample
//     });
//     setEdited(false);
//   }

//   return (
//         <div className={`${edited ? "flex flex-row flex-1 gap-2 ring-2 ring-orange-400" : "flex flex-col justify-between"}`}>
//             {!edited ? (
//               <div>
//                 <p className='uppercase font-bold'>{phrasalVerb}</p>
//                 <p>{example}</p>
//               </div>
//             ) : (
//               <div className='mt-auto flex-1'>
//                 <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
//                   <input type="hidden" name="id" value={id} />
//                   <input className='ring-1 p-1 outline-none' type="text" name="phrasalVerb" value={initialPhrasalVerb} onChange={(e) => setInitialPhrasalVerb(e.target.value)} />
//                   <input className='ring-1 p-1 outline-none' type="text" name="example" value={initialExample} onChange={(e) => setInitialExample(e.target.value)} />
//                   <button type="submit" className='bg-green-600 px-4 py-2 text-white hover:bg-green-700 duration-500 rounded-md'>
//                     Update
//                   </button>
//                 </form> 
//               </div>
//             )}
//             <div className='mt-auto'>
//               <button onClick={() => setEdited((prev) => !prev)} className='bg-green-600 px-4 py-2 text-white hover:bg-green-700 duration-500 rounded-md'>
//                   {!edited ? "Edit" : "Cancel"}
//               </button>
//             </div>
//         </div>
//   )
// }

// export default EditPhrasalVerb
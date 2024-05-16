"use client"

import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { usePhrasalVerbsInfoContext } from '../сontext/Provider'
import { FaHeart } from "react-icons/fa6";
import FavoritePhrasalVerbCard from './FavoritePhrasalVerbCard';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  
  const { favoritePhrasalVerbs } = usePhrasalVerbsInfoContext();
  const { data:session } = useSession();
  const userId = session?.user?.id;
  const isAdmin = session?.user?.isAdmin === "Yes";
  const favoritePhrasalVerbsOfUser = favoritePhrasalVerbs.filter((item) => item.userId === userId);

  return (
    <div className='bg-orange-200 p-8 flex justify-between items-center'>
      <p className='uppercase text-xl font-extrabold'>Navbar</p>
      <div className='flex items-center gap-4'>
        {!isAdmin && pathname !== "/" && favoritePhrasalVerbsOfUser.length >= 1 && (
          <div className='relative cursor-pointer' onClick={() => setShow(true)}>
            <FaHeart size={28} />
            {favoritePhrasalVerbsOfUser.length > 0 ? (
              <span className='bottom-[-8px] right-[-4px] absolute text-white bg-red-500 flex justify-center items-center rounded-full w-[80%] h-[80%]'>{favoritePhrasalVerbsOfUser.length}</span>
            ) : null}
          </div>
        )}
      </div>

      {show ? (
        <div className='h-screen w-[250px] min-[500px]:w-[300px] md:w-[400px] fixed top-0 right-0 bg-orange-200 z-50 duration-500 p-4 flex flex-col gap-4'>
          {favoritePhrasalVerbsOfUser.map((item) => (
            <div key={item.id}>
              <FavoritePhrasalVerbCard 
                show={show}
                setShow={setShow}
                id={item.id}
                userId={userId}
                phrasalVerb={item.phrasalVerb}
                example={item.example}
              />
            </div>
          ))}
        </div>
      ) : <div className='h-screen w-[250px] md:w-[400px] fixed top-0 right-[-110%] bg-orange-200 z-50 duration-500'>
      </div>
      }

      {show && <div onClick={() => setShow(false)} className='w-screen h-screen bg-black/70 top-0 left-0 absolute'>
      </div>}
    </div>
  )
}

export default Navbar
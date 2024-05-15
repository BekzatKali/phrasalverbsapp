"use client"

import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { usePhrasalVerbsInfoContext } from '../сontext/Provider';

type FavoritesProps = {
  id: string,
  userId: string,
  phrasalVerb: string,
  example: string,
}

const Favorites = ({ id, userId, phrasalVerb, example }: FavoritesProps) => {
  const [adding, setAdding] = useState(false);
  const { favorites, favoritePhrasalVerbs } = usePhrasalVerbsInfoContext();
  const phrasalVerbToAdd = { id, userId, phrasalVerb, example };
  
  const isFavorite = favoritePhrasalVerbs.some((item) => item.id === id);

  const handleClick = () => {
    setAdding((prev) => !prev);
    favorites(phrasalVerbToAdd);
  };

  useEffect(() => {
    setAdding(isFavorite);
  }, [isFavorite, favoritePhrasalVerbs]);

  return (
    <div>
        {!adding ? <FaRegHeart className='cursor-pointer' onClick={handleClick} size={30} /> :  <FaHeart className='cursor-pointer' onClick={handleClick} size={30} />}
    </div>
  )
}

export default Favorites
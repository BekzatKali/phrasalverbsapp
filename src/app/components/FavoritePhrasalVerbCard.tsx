import React from 'react'
import { FaHeart } from "react-icons/fa";
import { usePhrasalVerbsInfoContext } from '../сontext/Provider';

type FavoritePhrasalVerbCard = {
  id: string,
  userId: string,
  phrasalVerb: string, 
  example: string,
  show: boolean,
  setShow: (value: boolean) => void,
}

const FavoritePhrasalVerbCard = ({ id, userId, phrasalVerb, example, show, setShow }: FavoritePhrasalVerbCard) => {
  const { favorites, favoritePhrasalVerbs } = usePhrasalVerbsInfoContext();
  const phrasalVerbToAdd = { id, userId, phrasalVerb, example };
  const favoritePhrasalVerbsOfUser = favoritePhrasalVerbs.filter((item) => item.userId === userId);

  const handleClick = () => {
    if (favoritePhrasalVerbsOfUser.length === 1) {
      setShow(false);
    }
    favorites(phrasalVerbToAdd);
  }

  return (
    <div className='ring-1 p-2 flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-xl uppercase'>{phrasalVerb}</h2>
          <p>{example.slice(0,1).toUpperCase() + example.slice(1)}</p>
        </div>
        <div onClick={handleClick}>
          <FaHeart size={30}/>
        </div>
    </div>
  )
}

export default FavoritePhrasalVerbCard
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type PhrasalVerbCardProps = {
  id: string,
  userId: string,
  phrasalVerb: string,
  example: string
}

type PhrasalVerbsInfoContext = {
  favoritePhrasalVerbs: PhrasalVerbCardProps[],
  setFavoritePhrasalVerbs: React.Dispatch<React.SetStateAction<PhrasalVerbCardProps[]>>,
  favorites: (phrasalVerbToAdd: PhrasalVerbCardProps) => void;
  removePhrasalVerb: (id: string) => void;
}

const PhrasalVerbsInfoContext = createContext({} as PhrasalVerbsInfoContext);

export function usePhrasalVerbsInfoContext() {
  return useContext(PhrasalVerbsInfoContext);
}

const Provider = ({ children }: {children: React.ReactNode}) => {
  const [favoritePhrasalVerbs, setFavoritePhrasalVerbs] = useState<PhrasalVerbCardProps[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favoritePhrasalVerbs');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favoritePhrasalVerbs', JSON.stringify(favoritePhrasalVerbs));
  }, [favoritePhrasalVerbs]);

  const removePhrasalVerb = (id: string) => {
    setFavoritePhrasalVerbs((prev) => prev.filter(item => item.id!== id));
  }

  const favorites = (phrasalVerbToAdd: PhrasalVerbCardProps) => {
    const { id, userId, phrasalVerb, example } = phrasalVerbToAdd;

    const alreadyFavorite = "alreadyFavorite";
    const notFavorite = "notFavorite";

    const adding = {
      id: id,
      userId: userId,
      phrasalVerb: phrasalVerb,
      example: example,
    }

    const isAlreadyFavorite = favoritePhrasalVerbs.some(item => item.id === id);

    if (isAlreadyFavorite) {
      setFavoritePhrasalVerbs((prev) => prev.filter(item => item.id !== id));
      return alreadyFavorite;
    } else {
      setFavoritePhrasalVerbs((prev) => [...prev, adding]);
      return notFavorite;
    }
  }

  return (
    <PhrasalVerbsInfoContext.Provider
      value={{
        favoritePhrasalVerbs,
        setFavoritePhrasalVerbs,
        favorites,
        removePhrasalVerb
      }}
    >
      {children}
    </PhrasalVerbsInfoContext.Provider>
  )
}

export default Provider

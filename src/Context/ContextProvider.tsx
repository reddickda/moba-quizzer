import { createContext, useContext, useState } from 'react';
import { IChamp } from '../App';

// tracks current score of session
interface ICurrentResults {
  numberCorrect: number,
  total: number,
}

interface IChampContext {
  currentChamp: IChamp,
  updateCurrentChamp: (newChamp: IChamp) => void,
  currentResults: ICurrentResults,
  updateCurrentResults: (correct: boolean) => void,
}

const ChampContext = createContext<IChampContext | null>(null);

export const ContextProvider = ({ children }: any) => {
  // default random champ?
  const [currentChamp, setCurrentChamp] = useState<IChamp>({
      name: 'Ashe',
      id: 'Ashe',
      image: 'asd',
      title: 'asd',
      blurb: 'asd',
      enemyTips: ["asds"],
      allyTips: ["Asdas"],
      tags: ["asdsa"],
      champSpells: [{id: "", name: "" , description: "ads", tooltip: "Asdas", image: "sd"}]
  });

  const [currentResults, setCurrentResults] = useState<ICurrentResults>( { numberCorrect:0, total:0 } );

  const updateCurrentChamp = (newChamp: IChamp) => {
    console.log({newChamp})
    setCurrentChamp(newChamp)
  }

  const updateCurrentResults = (correct: boolean) => {
    setCurrentResults((prevState) => ( { total: prevState.total + 1, numberCorrect: correct ? prevState.numberCorrect + 1 : prevState.numberCorrect } ))
  }

  return (
    <ChampContext.Provider value={{ currentChamp, updateCurrentChamp, currentResults, updateCurrentResults }}>
      {children}
    </ChampContext.Provider>
  );
}

export function useChampContext() {
  return useContext(ChampContext);
}

import { createContext, useContext, useState } from 'react';
import { IChamp, IChampSpell } from '../App';
import { setupQuiz } from './SetupQuiz';

// each question will have all 4 options, 1 answer, a correct or not boolean, and an answered or not boolean
// options will include 1 correct answer and 3 random options
export interface IQuestion {
  isCorrect: boolean,
  option: IChampSpell,
}

// quiz will be 4 questions long
export interface IQuiz {
  questions: IQuestion[],
  finished: boolean,
}

// when a champ + spell combo is answered we add to a set and check that to not repeat question - hash the champspellcombo
// setup quiz just returns a new champ + spell combo with random spells

// 4 options, one is marked as correct during setup
// click the correct one (check isCorrect) make green, else make red and show green answer

// click option- if wrong make it red and show right answer
// if right make it green and show description
// on new champ click wipe this state clean

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
  quiz: IQuiz | undefined,
  setupCurrentQuiz: (newChamp: IChamp) => void,
  setQuizFinished: (finished: boolean) => void,
  visitedChampSpellCombo: Set<string>,
  updateVisitedChampSpellCombo: (newCombo: string) => void
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
    champSpells: [{ id: "", name: "", description: "ads", tooltip: "Asdas", image: "sd" }]
  });

  const [visitedChampSpellCombo, setVisitedChampSpellCombo] = useState<Set<string>>(new Set<string>());

  const [quiz, setQuiz] = useState<IQuiz>();

  const [currentResults, setCurrentResults] = useState<ICurrentResults>({ numberCorrect: 0, total: 0 });

  const updateCurrentChamp = (newChamp: IChamp) => {
    setCurrentChamp(newChamp)
  }

  const updateCurrentResults = (correct: boolean) => {
    setCurrentResults((prevState) => ({ total: prevState.total + 1, numberCorrect: correct ? prevState.numberCorrect + 1 : prevState.numberCorrect }))
  }

  const updateVisitedChampSpellCombo = (newCombo: string) => {
    setVisitedChampSpellCombo((prevState) => prevState.add(newCombo));
  }

  // each quiz is one question essentially and we track results
  const setupCurrentQuiz = (newChamp: IChamp) => {
    console.log("setting up quiz...")
    const newQuiz = setupQuiz(newChamp, visitedChampSpellCombo, updateVisitedChampSpellCombo);
    console.log({ newQuiz })
    if (!newQuiz) {
      // update champ
    } else {
      setQuiz(newQuiz)
    }
  }

  const setQuizFinished = () => {
    if(quiz){
      const finishedQuiz:IQuiz = {...quiz, finished: true}
      setQuiz(finishedQuiz)
    }
  }

  return (
    <ChampContext.Provider value={{
      currentChamp,
      updateCurrentChamp,
      currentResults,
      updateCurrentResults,
      quiz,
      setupCurrentQuiz,
      setQuizFinished,
      visitedChampSpellCombo,
      updateVisitedChampSpellCombo
    }}>
      {children}
    </ChampContext.Provider>
  );
}

export function useChampContext() {
  return useContext(ChampContext);
}

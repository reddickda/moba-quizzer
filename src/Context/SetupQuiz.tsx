import { IChamp, IChampSpell } from "../App";
import { IQuiz, IQuestion } from "./ContextProvider";
import AatroxData from '../RiotApiData/AatroxData.json';
export function setupQuiz(currentChamp: IChamp, visitedChampSpellCombo: Set<string>, updateVisitedChampSpellCombo: (newCombo: string) => void): IQuiz | undefined {

  const aatroxSpells: IChampSpell[] = AatroxData.data.Aatrox.spells.map((spell) => {
    return {
      id: spell.id,
      name: spell.name,
      description: spell.description,
      tooltip: spell.tooltip,
      image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${spell.image.full}`
    }
  })
  // get all champ spells
  // map through and create a question for each
  const currChampSpells = currentChamp.champSpells;

  for (let i = 0; i < 4; i++) {
    const hashedValue = hashSpellChampCombo(currentChamp.id, currChampSpells[i].id);
    if (!visitedChampSpellCombo.has(hashedValue)) {
      updateVisitedChampSpellCombo(hashedValue);
      // get other random spells
      // return quiz
      const questions: IQuestion[] = [];
      questions.push({ isCorrect: true, option: currChampSpells[i] });

      for (let j = 0; j < 3; j++) {
        // TODO this needs to be a random spell 
        // TODO shuffle this
        questions.push({ isCorrect: false, option: aatroxSpells[j] })
      }

      shuffleArray(questions)
      return {
        questions,
        finished: false
      }
    }
  }

  return;
  // set new champ, all combos seen
}

// something will have to be correct false AND answered false to mean wrong answer

function hashSpellChampCombo(champId: string, spellId: string) {
  return `${champId}-${spellId}`
}

function shuffleArray(array: IQuestion[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// http://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion/Ashe.json
import jinxData from './RiotApiData//JinxData.json';
// http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json
import allChampData from './RiotApiData/AllChampData.json';
import { IChamp, IChampSpell } from './App';

// right now just updates to jinx from ashe, need to use api data and randomize
export function selectNewChampAndUpdateQuiz(updateCurrentChamp: ((newChamp: IChamp) => void | undefined) | undefined, setupCurrentQuiz: ((newChamp: IChamp) => void | undefined) | undefined) {
  const currChampOverview = allChampData.data['Jinx'];
  const champSpecifics = jinxData.data['Jinx'];

  if (updateCurrentChamp && setupCurrentQuiz) {
    const champSpells: IChampSpell[] = champSpecifics.spells.map((spell) => {
      return {
        id: spell.id,
        name: spell.name,
        description: spell.description,
        tooltip: spell.tooltip,
        image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${spell.image.full}`
      }
    })

    const champ: IChamp = {
      name: currChampOverview.name,
      id: currChampOverview.id,
      image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${currChampOverview.image.full}`,
      title: currChampOverview.title,
      blurb: currChampOverview.blurb,
      tags: currChampOverview.tags,
      enemyTips: champSpecifics.enemytips,
      allyTips: champSpecifics.allytips,
      champSpells: champSpells
    }

    updateCurrentChamp(champ);
    setupCurrentQuiz(champ);
  }
}
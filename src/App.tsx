import { Grid, Text, Stack, Button } from '@mantine/core';
import { useEffect } from 'react'
import { ThemeProvider } from './ThemeProvider';
// http://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion/Ashe.json
import asheData from './RiotApiData/AsheData.json';
// http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json
import allChampData from './RiotApiData/AllChampData.json';
import { useChampContext } from './Context/ContextProvider';
import { selectNewChampAndUpdateQuiz } from './ChampUpdater';
import { ChampAndQuizContent } from './Components/ChampAndQuizContent';

export interface IChampSpell {
  id: string,
  name: string,
  description: string,
  tooltip: string,
  image: string,
}

export interface IChamp {
  name: string,
  id: string,
  image: string,
  title: string,
  blurb: string,
  enemyTips: string[],
  allyTips: string[],
  tags: string[],
  champSpells: IChampSpell[]
}


export default function App() {
  const champContext = useChampContext();

  useEffect(() => {
    // TODO this will need to be from api calls, but for now hard coded as ashe
    // Eventually add an in game sprite
    // start with a random champ, then next champ
    const currChampOverview = allChampData.data['Ashe'];
    const champSpecifics = asheData.data['Ashe'];

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

    champContext?.updateCurrentChamp(champ);
    champContext?.setupCurrentQuiz(champ);
  }, [])

  const handleNextChamp = () => {
    selectNewChampAndUpdateQuiz(champContext?.updateCurrentChamp, champContext?.setupCurrentQuiz)
  }

  return (
    <ThemeProvider>
      <Stack style={{ justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
        <Text>League of Legends Quiz</Text>
        <Text>Learn all champs easy with this tool!</Text>
        {champContext?.currentChamp &&
          <ChampAndQuizContent />
        }
        <Grid p={5}>
          <Grid.Col span={6}>
            <Button onClick={handleNextChamp}>Next Champ</Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </ThemeProvider>
  );
}
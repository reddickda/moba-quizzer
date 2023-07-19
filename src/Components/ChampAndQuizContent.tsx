
import { Text } from '@mantine/core';
import { CurrentChamp } from "./CurrentChamp"
import { SpellSelection } from "./SpellSelection"
import { useChampContext } from '../Context/ContextProvider';

export const ChampAndQuizContent = () => {
  const champContext = useChampContext();
  
  if(!champContext)
    return

  return (
    <>
      <CurrentChamp currentChamp={champContext?.currentChamp} />
      <Text>Current Score: {champContext.currentResults.numberCorrect} / {champContext.currentResults.total} </Text>
      <SpellSelection champSpells={champContext?.currentChamp.champSpells} champName={champContext?.currentChamp.name} />
    </>
  )
}
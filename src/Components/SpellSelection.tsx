import { Paper, Stack, Text, Grid, Button, Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useChampContext } from '../Context/ContextProvider';
import { IChampSpell, IChamp } from '../App';

import { SpellOption } from './SpellOption';

interface SpellSelectionProps {
  champSpells: IChampSpell[],
  champName: string,
}

export const SpellSelection = ({ champName }: SpellSelectionProps) => {
  const champContext = useChampContext();
  const [answered, setAnswered] = useState<boolean>(false)

  useEffect(() => {
    setAnswered(false);
  }, [])
  // Do a random order of the spell options
  // Need this to be a kind of quiz, shuffle order of champ spells, make state values for all champs spells with a 'correct' bool
  // have 4 diff questions to try and nail all options
  // return results ie 4/4 correct! or 2/4 correct...
  // may need to go into random champ data for a spell

  return (
    <Stack>
      <>
        <Text style={{ textAlign: 'center' }}>Which of the following is one of {champName}'s' spells?</Text>
        <Grid style={{ width: '80vw' }} justify={'center'} p={10}>
          {champContext?.quiz?.questions.map((question, index) => {
            return (
              <Grid.Col key={champName + question.option.id + index.toString()}  lg={12} xs={12}>
                <SpellOption disabled={answered} setDisabled={setAnswered} champName={champName} spell={question.option} isCorrect={question.isCorrect} />
              </Grid.Col>
            )
          })}
        </Grid>
      </>
    </Stack>
  );
};
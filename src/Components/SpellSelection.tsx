import { Paper, Stack, Text, Grid, Button, Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IChampSpell, IChamp } from '../App';
import AatroxData from '../RiotApiData/AatroxData.json';
import JinxData from '../RiotApiData/JinxData.json';
import AsheData from '../RiotApiData/AsheData.json';

import { SpellOption } from './SpellOption';

interface SpellSelectionProps {
  champSpells: IChampSpell[],
  champName: string,
}

export const SpellSelection = ({ champSpells, champName }: SpellSelectionProps) => {
  const [randomSpellOne, setRandomSpellOne] = useState<IChampSpell>();
  const [randomSpellTwo, setRandomSpellTwo] = useState<IChampSpell>();
  const [randomSpellThree, setRandomSpellThree] = useState<IChampSpell>();

  useEffect(() => {
    // these to be replaced by db calls probably
    const aatroxSpells: IChampSpell[] = AatroxData.data.Aatrox.spells.map((spell) => {
      return {
        id: spell.id,
        name: spell.name,
        description: spell.description,
        tooltip: spell.tooltip,
        image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${spell.image.full}`
      }
    })

    const jinxspells: IChampSpell[] = JinxData.data.Jinx.spells.map((spell) => {
      return {
        id: spell.id,
        name: spell.name,
        description: spell.description,
        tooltip: spell.tooltip,
        image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${spell.image.full}`
      }
    })

    const asheSpells: IChampSpell[] = AsheData.data.Ashe.spells.map((spell) => {
      return {
        id: spell.id,
        name: spell.name,
        description: spell.description,
        tooltip: spell.tooltip,
        image: `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${spell.image.full}`
      }
    })
    setRandomSpellOne({
      id: aatroxSpells[0].id,
      name: aatroxSpells[0].name,
      description: aatroxSpells[0].description,
      tooltip: aatroxSpells[0].tooltip,
      image: aatroxSpells[0].image,
    });
    setRandomSpellTwo({
      id: aatroxSpells[2].id,
      name: aatroxSpells[2].name,
      description: aatroxSpells[2].description,
      tooltip: aatroxSpells[2].tooltip,
      image: aatroxSpells[2].image,
    });
    if (champName === 'Ashe') {
      setRandomSpellThree({
        id: jinxspells[0].id,
        name: jinxspells[0].name,
        description: jinxspells[0].description,
        tooltip: jinxspells[0].tooltip,
        image: jinxspells[0].image,
      })
    }
    else {
      setRandomSpellThree({
        id: asheSpells[0].id,
        name: asheSpells[0].name,
        description: asheSpells[0].description,
        tooltip: asheSpells[0].tooltip,
        image: asheSpells[0].image,
      })
    }
  }, [champName])

  const getRandomSpell = () => {
    // will need to get a random champ and then a random spell from that champ
    // probably best to store data in a rdbms and make queries for this stuff
    console.log("random spell!")
  }

  const handleNextSpell = () => {
    console.log('next spell!')
  }

  // Do a random order of the spell options
  // Need this to be a kind of quiz, shuffle order of champ spells, make state values for all champs spells with a 'correct' bool
  // have 4 diff questions to try and nail all options
  // return results ie 4/4 correct! or 2/4 correct...
  // may need to go into random champ data for a spell

  return (
    <Stack>
      {/* add a search here maybe instead? */}
      {randomSpellOne && randomSpellTwo && randomSpellThree &&
        <>
          <Text style={{ textAlign: 'center' }}>Which of the following is one of {champName}'s' spells?</Text>
          <Grid style={{ width: '80vw' }} justify={'center'} p={10}>
            <Grid.Col xl={3} md={12} xs={12}>
              <SpellOption spell={champSpells[0]} />
            </Grid.Col>
            <Grid.Col xl={3} md={12} xs={12}>
              <SpellOption spell={randomSpellOne} />
            </Grid.Col>
            <Grid.Col xl={3} md={12} xs={12}>
              <SpellOption spell={randomSpellTwo} />
            </Grid.Col>
            <Grid.Col xl={3} md={12} xs={12}>
              <SpellOption spell={randomSpellThree} />
            </Grid.Col>
          </Grid>
          {/* <Flex justify={'center'}>
            <Button onClick={handleNextSpell}>Next Ability</Button>
          </Flex> */}
        </>
      }
    </Stack>
  );
};

import { Avatar, Card, Group, Stack, Text, createStyles } from '@mantine/core';
import { useState } from 'react';
import { IChampSpell } from '../App';
import { useChampContext } from '../Context/ContextProvider';

interface SpellOptionProps {
  spell: IChampSpell
}

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 0.2s ease-out',
    '&:hover': {
      // transform: `translateY(-${theme.spacing.xs})`,
      // elevation: 2,
      backgroundColor: '#313336',
    },
    width: 250,
    height: 100,
    minWidth: 250,
    maxWidth: 250,
    alignItems: 'center'
  },
}));

export const SpellOption = ({ spell }: SpellOptionProps) => {
  const { classes, theme } = useStyles();
  const champContext  = useChampContext();
  const [ correct, setCorrect ] = useState<boolean>(false)

  const handleClick = () => {
    const flatSpellIds = champContext?.currentChamp.champSpells.map((champSpell) => champSpell.id);
    if(flatSpellIds?.includes(spell.id)){
      setCorrect(true);
      champContext?.updateCurrentResults(true);
    } else {
      champContext?.updateCurrentResults(false);
    }
  }

  // TODO only show description on answer
  return (
    <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center'}} onClick={handleClick}>
      <Card className={classes.card} component='button' style={{ maxWidth: 300, backgroundColor: correct ? 'green' : theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white }} id={spell.id} withBorder radius="md">
        <Stack justify="space-between">
          <Group position="apart">
            <Text>{spell.name}</Text>
            <Avatar src={spell.image} radius="xl" size="md" />
          </Group>
          {/* <Group position="apart">
            <Text size='sm'>{champSpell.description}</Text>
          </Group> */}
        </Stack>
      </Card>
    </div>)
};

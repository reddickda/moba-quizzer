import { Avatar, Card, Popover, Group, Stack, Text, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IChamp, IChampSpell } from '../App';
import { useChampContext } from '../Context/ContextProvider';

interface SpellOptionProps {
  spell: IChampSpell,
  isCorrect: boolean,
  champName: string,
  disabled: boolean,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
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
    minWidth: 300,
    maxWidth: 300,
    alignItems: 'center'
  },
  dropdown: {
    opacity: .9
  }
}));

export const SpellOption = ({ spell, isCorrect }: SpellOptionProps) => {
  const { classes, theme } = useStyles();
  const champContext = useChampContext();
  const [correct, setCorrect] = useState<boolean>(false);
  const [inCorrect, setInCorrect] = useState<boolean>(false);

  useEffect(() => {
    setCorrect(false);
    setInCorrect(false)
  }, [])

  const handleClick = () => {
    if (!champContext?.quiz?.finished) {
      champContext?.setQuizFinished(true);
      if (isCorrect) {
        setCorrect(true)
        champContext?.updateCurrentResults(true);
      } else {
        setInCorrect(true);
        champContext?.updateCurrentResults(false);
      }
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center' }}>
      {champContext?.quiz?.finished ?
        <Card withBorder style={{ backgroundColor: isCorrect ? 'green' : inCorrect ? 'red' : theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white }}>
          <Avatar src={spell.image} radius="xl" size="md"></Avatar>
          <Text size="xs" mb="xs" weight={500}>
            {spell.description}
          </Text>
        </Card> :
        <Card onClick={handleClick} className={classes.card} component='button' style={{ maxWidth: 300, backgroundColor: correct ? 'green' : inCorrect ? 'red' : theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white }} id={spell.id} withBorder radius="md">
          <Stack justify="space-between">
            <Group position="apart">
              <Text>{spell.name}</Text>
              <Avatar src={spell.image} radius="xl" size="md" />
            </Group>
          </Stack>
        </Card>
      }
    </div>
  )
};

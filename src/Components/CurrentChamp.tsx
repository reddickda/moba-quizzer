import { Avatar, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { IChamp } from '../App';
import { ChampCard } from './ChampCard';

interface CurrentChampProps {
  currentChamp: IChamp,
}

export const CurrentChamp = ({ currentChamp }: CurrentChampProps) => (
  <Stack>
    <ChampCard currentChamp={currentChamp} />
  </Stack>
);

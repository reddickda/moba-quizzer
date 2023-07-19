import { Avatar, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { IChamp } from '../App';

interface ChampCardProps {
  currentChamp: IChamp
}

export const ChampCard = ({ currentChamp }: ChampCardProps) => (
    <Card style={{maxWidth: 300}} id={currentChamp.id} withBorder radius="md">
      <Stack justify="space-between">
        <Group position="apart">
        <Text>{currentChamp.name}</Text>
        <Avatar src={currentChamp.image} radius="xl" size="md" />
        </Group>
        <Group position="apart">
          <Text size='sm'>{currentChamp.blurb}</Text>
        </Group>
      </Stack>
    </Card>
  );

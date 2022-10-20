import { Group, Text } from '@mantine/core';
import React from 'react';

const GroupInfo = ({
  field,
  value,
  between,
}: {
  field: string;
  value?: string;
  between?: boolean;
}) => {
  return (
    <Group sx={{ justifyContent: between ? 'space-between' : '' }}>
      <Text size={'lg'} weight={600}>
        {field}:
      </Text>
      <Text color={'gray'}>{value}</Text>
    </Group>
  );
};

export default GroupInfo;

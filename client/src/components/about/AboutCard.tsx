import { Box, Image, Stack, Text, Title } from '@mantine/core';
import React from 'react';

interface IProps {
  imageUrl: string;
  title: string;
  description: string;
}

const AboutCard = ({ description, imageUrl, title }: IProps) => {
  return (
    <Stack
      sx={{
        border: '1px solid lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <Box sx={{ position: 'relative', width: '4rem', height: '4rem' }}>
        <Image alt="" src={imageUrl} className="img" />
      </Box>
      <Title order={2}>{title}</Title>
      <Text>{description}</Text>
    </Stack>
  );
};

export default AboutCard;

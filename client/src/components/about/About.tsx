import { Box, Group, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import AboutImage from '../../images/about.png';

const About = () => {
  return (
    <Box>
      <MetaData title="About" />
      <Header />
      <Box sx={{ width: '90%', margin: '2rem auto', padding: '30px' }}>
        <Group sx={{ alignItems: 'flex-start' }} spacing={0}>
          <Box
            sx={{
              width: '50%',
            }}
          >
            <Image src={AboutImage} />
          </Box>
          <Stack
            sx={{ padding: '2rem 5rem', wordBreak: 'break-all', width: '50%' }}
          >
            <Text size={40} weight={600}>
              Welcome to{' '}
              <span style={{ color: '#f4732d', fontWeight: 700 }}>
                CITY SHOP
              </span>
            </Text>
            <Text color={'gray'}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Excepturi sint enim dolor praesentium, exercitationem quasi
              ratione perferendis aperiam omnis eaque accusamus natus libero
              nesciunt harum velit. Dolore placeat provident at? Exercitationem
              quasi ratione perferendis aperiam omnis eaque accusamus natus
              libero nesciunt harum velit. Dolore placeat provident at?
            </Text>
            <Text color={'gray'}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Excepturi sint enim dolor praesentium, exercitationem quasi
              ratione perferendis aperiam omnis eaque accusamus natus libero
              nesciunt harum velit. Dolore placeat provident at? Exercitationem
              quasi ratione perferendis aperiam omnis eaque accusamus natus
              libero nesciunt harum velit. Dolore placeat provident at?
            </Text>
          </Stack>
        </Group>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;

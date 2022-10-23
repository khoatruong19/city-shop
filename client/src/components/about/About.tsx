import { Box, Grid, Group, Image, Stack, Text } from '@mantine/core';
import AboutImage from '../../images/about.png';
import {
  largeScreenQuery,
  mainOrangeColor,
  mediumScreenQuery,
  smallScreenQuery,
} from '../../utils/constants';
import { aboutInfos } from '../../utils/data';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import AboutCard from './AboutCard';
import { useMediaQuery } from '@mantine/hooks';

const About = () => {
  const largeScreen = useMediaQuery(largeScreenQuery);
  const smallScreen = useMediaQuery(smallScreenQuery);
  const mediumScreen = useMediaQuery(mediumScreenQuery);
  return (
    <Box>
      <MetaData title="About" />
      <Header />
      <Box sx={{ margin: '2rem auto', padding: '30px' }}>
        <Group sx={{ justifyContent: 'center' }} spacing={0}>
          <Box
            sx={{
              width: largeScreen ? '40vw' : '100%',
              position: 'relative',
            }}
          >
            <Image className="img" src={AboutImage} />
          </Box>
          <Stack
            sx={{
              flex: 1,
              padding: '2rem',
            }}
          >
            <Text size={40} weight={600}>
              Welcome to{' '}
              <span
                style={{
                  color: mainOrangeColor,
                  fontWeight: 700,
                  wordBreak: 'break-word',
                }}
              >
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

        <Group
          sx={{
            justifyContent: 'center',
            marginTop: largeScreen ? '3rem' : '1rem',
          }}
        >
          <Text size={largeScreen ? 40 : 35} weight={600} align="center">
            What We Provide?
          </Text>
          <Grid
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {aboutInfos.map((info, i) => (
              <Grid.Col key={i} span={smallScreen ? 12 : mediumScreen ? 6 : 4}>
                <AboutCard
                  description={info.description}
                  imageUrl={info.imageUrl}
                  title={info.title}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Group>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;

import { Button, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { smallScreenQuery } from '../../utils/constants';

const BannerContent = () => {
  const smallScreen = useMediaQuery(smallScreenQuery);

  return (
    <Stack
      sx={{
        width: smallScreen ? '100%' : '70%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: smallScreen ? '2rem' : '',
      }}
    >
      <Text size={!smallScreen ? 50 : 30} weight={400} color={'white'} mb={-40}>
        By 2 Get <span style={{ color: 'yellow' }}>1 Free</span>
      </Text>
      <Text size={!smallScreen ? 80 : 50} weight={600} color={'white'} mb={-50}>
        Fashionable
      </Text>
      <Text size={!smallScreen ? 80 : 50} weight={400} color={'white'} mb={-40}>
        Collection
      </Text>
      <Text size={!smallScreen ? 20 : 15} color={'white'}>
        Get free Shipping on all orders over $99.00
      </Text>
      <Button
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      >
        SHOP NOW
      </Button>
    </Stack>
  );
};

export default BannerContent;

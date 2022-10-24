import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { Box, Button, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { mainOrangeColor } from '../../utils/constants';
import BottomTab from './BottomTab';

const CommingSoon = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <WrenchScrewdriverIcon
        style={{ width: '6rem', height: '6rem', color: mainOrangeColor }}
      />
      <Title order={2} sx={{ fontFamily: 'Chilanka' }}>
        Comming Soon !
      </Title>
      <Button color="orange" size="md" onClick={() => navigate(-1)}>
        Back
      </Button>
      <BottomTab />
    </Stack>
  );
};

export default CommingSoon;

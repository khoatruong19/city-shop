import { Loader, Stack } from '@mantine/core';

const WaitingLoader = () => {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader color={'orange'} />
    </Stack>
  );
};

export default WaitingLoader;

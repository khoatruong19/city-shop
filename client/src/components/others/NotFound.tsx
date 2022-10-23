import { Button, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Title>404 Not Found</Title>
      <Button color="orange" size="md" onClick={() => navigate('/')}>
        Back to homepage
      </Button>
    </Stack>
  );
};

export default NotFound;

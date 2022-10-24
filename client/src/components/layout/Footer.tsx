import { Box, Group, Image, Stack, Text, Title } from '@mantine/core';
import Logo from '../../images/logo.png';
import {
  MapPinIcon,
  EnvelopeOpenIcon,
  PhoneIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { largeScreenQuery } from '../../utils/constants';
import { useMediaQuery } from '@mantine/hooks';

const Footer = () => {
  const largeScreen = useMediaQuery(largeScreenQuery);
  return (
    <Box
      sx={{
        borderTop: '1px solid black',
        padding: `2rem ${largeScreen ? '6rem' : '1rem'}`,
      }}
    >
      <Group
        sx={{
          justifyContent: 'space-around',
          gap: '2rem',
        }}
      >
        <Stack>
          <Image
            width={90}
            style={{ scale: '1.5', marginLeft: '2rem', alignSelf: 'center' }}
            alt=""
            src={Logo}
          />
          <Group spacing={5}>
            <MapPinIcon className="footerIcon" color="green" />
            <Title order={4}>Address:</Title>
            <Text>Ho Chi Minh City</Text>
          </Group>
          <Group spacing={5}>
            <EnvelopeOpenIcon className="footerIcon" color="green" />
            <Title order={4}>Email:</Title>
            <Text>khoa.truongthdk@gmai.com</Text>
          </Group>
          <Group spacing={5}>
            <PhoneIcon className="footerIcon" color="green" />
            <Title order={4}>Call us:</Title>
            <Text>+15345678923</Text>
          </Group>
          <Group spacing={5}>
            <ClockIcon className="footerIcon" color="green" />
            <Title order={4}>Time:</Title>
            <Text>10:00 AM - 10:00 PM (everyday)</Text>
          </Group>
        </Stack>

        <Group
          spacing={40}
          sx={{ justifyContent: 'space-around' }}
          align={'flex-start'}
        >
          <Stack spacing={10}>
            <Title order={2}>Account</Title>
            <Link to="/auth" className="linkHover">
              <Title order={4}>Log In</Title>
            </Link>
            <Link to="/auth" className="linkHover">
              <Title order={4}>Sign Up</Title>
            </Link>
            <Link to="/password/forgot" className="linkHover">
              <Title order={4}>Forgot Password</Title>
            </Link>
          </Stack>
          <Stack spacing={10} sx={{ flex: 1 }}>
            <Title order={2}>Follow us</Title>
            <Link to="/" className="linkHover">
              <Title order={4}>Facebook</Title>
            </Link>
            <Link to="/" className="linkHover">
              <Title order={4}>Youtube</Title>
            </Link>
            <Link to="/" className="linkHover">
              <Title order={4}>Instagram</Title>
            </Link>
          </Stack>
          <Stack spacing={10}>
            <Title order={2}>Business</Title>
            <Link to="/creator" className="linkHover">
              <Title order={4}>Create A Seller Account</Title>
            </Link>
            <Link to="/creator" className="linkHover">
              <Title order={4}>Seller Rules</Title>
            </Link>
            <Link to="/" className="linkHover">
              <Title order={4}>View Shop</Title>
            </Link>
            <Link to="/support" className="linkHover">
              <Title order={4}>Report Us</Title>
            </Link>
          </Stack>
          <Stack spacing={10}>
            <Title order={2}>Rules</Title>
            <Link to="/faq" className="linkHover">
              <Title order={4}>FAQ</Title>
            </Link>
            <Link to="/contact" className="linkHover">
              <Title order={4}>Contact Us</Title>
            </Link>
            <Link to="/about" className="linkHover">
              <Title order={4}>About Us</Title>
            </Link>
            <Link to="/commingsoon" className="linkHover">
              <Title order={4}>Live Chat</Title>
            </Link>
          </Stack>
        </Group>
      </Group>
    </Box>
  );
};

export default Footer;

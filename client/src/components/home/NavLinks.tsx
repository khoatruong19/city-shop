import { Anchor, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { largeScreenQuery } from '../../utils/constants';

const NavLinks = () => {
  const largeScreen = useMediaQuery(largeScreenQuery);
  return (
    <Group
      spacing="lg"
      sx={{
        width: !largeScreen ? '100%' : '',
        justifyContent: !largeScreen ? 'space-between' : '',
      }}
    >
      <Anchor component={Link} to="/" className="anchor">
        Home
      </Anchor>
      <Anchor component={Link} to="/about" className="anchor">
        About
      </Anchor>
      <Anchor component={Link} to="/products" className="anchor">
        Products
      </Anchor>
      <Anchor component={Link} to="/offers" className="anchor">
        Offers
      </Anchor>
      <Anchor component={Link} to="/creator" className="anchor">
        Become A Seller
      </Anchor>
      <Anchor component={Link} to="/faq" className="anchor">
        Users Rules
      </Anchor>
      <Anchor component={Link} to="/contact" className="anchor">
        Contact
      </Anchor>
    </Group>
  );
};

export default NavLinks;

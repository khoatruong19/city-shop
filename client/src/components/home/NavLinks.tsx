import { Anchor, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <Group spacing="lg">
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
      <Anchor component={Link} to="/creater" className="anchor">
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

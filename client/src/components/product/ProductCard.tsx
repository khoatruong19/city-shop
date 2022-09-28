import { Container, Group, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../utils/models/product.model';
import ReactStars from 'react-rating-stars-component';

interface IProps {
  product: Product;
}

const ProductCard = ({ product }: IProps) => {
  const options = {
    value: product.ratings,
    edit: false,
    precision: 0.5,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <Container
        sx={{
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            transform: 'translateY(-5%)',
            transition: 'all 0.5s ease-in-out',
          },
          border: '1px solid gray',
          height: '240px',
          padding: '5px',
          borderRadius: '0.5rem',
        }}
      >
        <Stack sx={{ height: '150px' }} justify="center" align={'center'}>
          <Image width={200} src={product.images[0].url} alt={product.name} />
        </Stack>
        <Text color={'black'} weight={600} sx={{ fontFamily: 'Chilanka' }}>
          {product.name}
        </Text>
        <div>
          <ReactStars {...options} />
          <span style={{ fontSize: '0.8rem', color: '#F48225' }}>
            {product.numOfReviews} Reviews
          </span>
        </div>
        <Group
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>{product.discountPrice && `$${product.discountPrice}`}</Text>
          <Text color={'green'} weight={500} size={18}>
            ${product.price}
          </Text>
        </Group>
      </Container>
    </Link>
  );
};

export default ProductCard;

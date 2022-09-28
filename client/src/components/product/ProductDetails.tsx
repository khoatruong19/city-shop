import {
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearError, getProductDetail } from '../../store/slices/productSlice';
import { Product } from '../../utils/models/product.model';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import ReactStars from 'react-rating-stars-component';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import ProductReviews from './ProductReviews';
import { showNotification } from '@mantine/notifications';

const ProductDetails = () => {
  const { product, loading, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const options = {
    value: product.ratings,
    edit: false,
    isHalf: 0.5,
    size: '30',
  };

  const handleControlQuantity = (mode: 'up' | 'down') => {
    if (mode === 'up') {
      if (product.stock <= quantity)
        return showNotification({
          id: 'hello-there',
          disallowClose: false,
          autoClose: 3000,
          message: 'Product stock limited!',
          color: 'red',
          sx: { fontWeight: 700 },
          loading: false,
        });
      setQuantity((prev) => prev + 1);
    } else setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
    if (id) dispatch(getProductDetail(id));
  }, [id]);

  if (loading) return <p>Loading</p>;

  return (
    <Box>
      <MetaData title={product.name} />
      <Header />
      <Group>
        <Container sx={{ flex: 1, padding: '2rem' }}>
          <img
            alt={product.name}
            src={product.images && product.images[0].url}
          />
        </Container>
        <Container sx={{ flex: 1, padding: '2rem' }}>
          <Title order={1}>{product.name}</Title>
          <Group spacing={3}>
            <ReactStars {...options} />

            <Text>({product.numOfReviews} Reviews)</Text>
          </Group>
          <Text color={'green'} size={30}>
            ${product.price}
          </Text>
          <Group>
            <Title order={3}>Quantity</Title>
            <Group>
              <Stack
                sx={{
                  padding: '0.5rem',
                  width: '3rem',
                  fontSize: '1.5rem',
                  backgroundColor: 'coral',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: '0.8',
                  },
                }}
                align="center"
                justify="center"
                onClick={() => handleControlQuantity('down')}
              >
                -
              </Stack>
              <Stack
                sx={{ minWidth: '2rem', fontSize: '1.2rem' }}
                align="center"
                justify="center"
              >
                {quantity}
              </Stack>
              <Stack
                sx={{
                  padding: '0.5rem',
                  width: '3rem',
                  fontSize: '1.5rem',
                  backgroundColor: 'coral',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: '0.8',
                  },
                }}
                align="center"
                justify="center"
                onClick={() => handleControlQuantity('up')}
              >
                +
              </Stack>
            </Group>
          </Group>
          <Title order={4} color={'green'}>
            {product.stock < 1 ? 'OutOfStock' : 'InStock'}
          </Title>
          <Box>
            <Text>Description:</Text>
            <Text mt={-7}>{product.description}</Text>
          </Box>
          <Group spacing={4}>
            <Group
              spacing={2}
              p={10}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <HeartIcon style={{ width: '2rem', height: '2rem' }} />
              <Text>Add to wishlist</Text>
            </Group>
            <Group
              spacing={2}
              p={10}
              sx={{
                backgroundColor: 'lightgray',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <ShoppingBagIcon style={{ width: '2rem', height: '2rem' }} />
              <Text>Add to cart</Text>
            </Group>
          </Group>
        </Container>
      </Group>
      <ProductReviews
        numOfReviews={product.numOfReviews}
        reviews={product.reviews}
      />
    </Box>
  );
};

export default ProductDetails;

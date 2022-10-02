import React, { useEffect, useRef } from 'react';
import Header from '../layout/Header';
import { Carousel } from '@mantine/carousel';
import BannerContent from './BannerContent';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllProducts } from '../../store/slices/productSlice';
import Autoplay from 'embla-carousel-autoplay';
import MetaData from '../layout/MetaData';
import Footer from '../layout/Footer';
import BannerImage from '../../images/background.jpg';
import BannerImage2 from '../../images/background2.jpg';

import { Box, Divider, Group, Stack, Text } from '@mantine/core';
import ProductCard from '../product/ProductCard';

const Home = () => {
  const { loading, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  useEffect(() => {
    dispatch(getAllProducts({ keyword: '', currentPage: 1 }));
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <MetaData title="Home" />
      <Header />
      <Carousel
        sx={{ width: '100%' }}
        withIndicators
        height="100vh"
        plugins={[autoplay.current]}
      >
        <Carousel.Slide
          style={{
            backgroundImage: `url(${BannerImage})`,

            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <BannerContent />
        </Carousel.Slide>
        <Carousel.Slide
          style={{
            backgroundImage: `url(${BannerImage2})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <BannerContent />
        </Carousel.Slide>
      </Carousel>

      <Stack mt={20} sx={{ height: '100vh' }}>
        <Text align="center" size={30} weight={600}>
          Features Products
        </Text>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Divider color={'black'} />
        </div>
        <Group sx={{ justifyContent: 'space-between', padding: '2rem' }}>
          {!loading &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </Group>
      </Stack>
      <Footer />
    </Box>
  );
};

export default Home;

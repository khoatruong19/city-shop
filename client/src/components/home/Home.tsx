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

import { Badge, Box, Divider, Group, Stack, Text } from '@mantine/core';
import ProductCard from '../product/ProductCard';
import BottomTab from '../others/BottomTab';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loading, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  useEffect(() => {
    dispatch(getAllProducts({ keyword: '', currentPage: 1 }));
  }, [dispatch]);

  return (
    <>
      <MetaData title="Home" />
      <Header />
      <Box>
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
              backgroundPosition: 'center',
            }}
          >
            <BannerContent />
          </Carousel.Slide>
        </Carousel>

        <Stack mt={20}>
          <Box sx={{ position: 'relative' }}>
            <Text align="center" size={30} weight={600}>
              Features Products
            </Text>
            <Link to="/products">
              <Badge
                sx={{
                  position: 'absolute',
                  bottom: '-3rem',
                  left: '50%',
                  translate: '-50% 0',
                }}
                className="hover"
                color={'orange'}
              >
                Show All Products
              </Badge>
            </Link>
          </Box>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <Divider color={'black'} />
          </div>
          <Group
            sx={{
              padding: '2rem',
              justifyContent: 'center',
              height: 'fit-content',
            }}
            spacing={40}
          >
            {!loading &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </Group>
        </Stack>
        <Footer />
        <BottomTab />
      </Box>
    </>
  );
};

export default Home;

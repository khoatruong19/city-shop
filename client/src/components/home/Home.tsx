import React, { useEffect, useRef } from 'react';
import Header from '../layout/Header';
import { Carousel } from '@mantine/carousel';
import BannerContent from './BannerContent';
import { useAppDispatch } from '../../store';
import { getAllProducts } from '../../store/slices/productSlice';
import Products from '../product/Products';
import Autoplay from 'embla-carousel-autoplay';
import MetaData from '../layout/MetaData';
import Footer from '../layout/Footer';
import BannerImage from '../../images/background.jpg';
import BannerImage2 from '../../images/background2.jpg';
import { me } from '../../store/slices/userSlice';
import UserNav from '../user/UserNav';
import { Box } from '@mantine/core';

const Home = () => {
  const dispatch = useAppDispatch();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(me());
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <MetaData title="Home" />
      <UserNav />
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
      <Products />
      <Footer />
      overflow: 'hidden',
    </Box>
  );
};

export default Home;

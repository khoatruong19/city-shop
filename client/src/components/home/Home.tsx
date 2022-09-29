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
import userApi from '../../api/userApi';

const Home = () => {
  const dispatch = useAppDispatch();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  useEffect(() => {
    dispatch(getAllProducts());
    const me = async () => {
      const res = await userApi.me();
      console.log(res);
    };
    me();
  }, []);

  return (
    <div>
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
      <Products />
      <Footer />
    </div>
  );
};

export default Home;

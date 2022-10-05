import { Stack, Text, Divider, Group, Box } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { mainOrangeColor } from '../../utils/constants';
import { categories, quickLinks } from '../../utils/data';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import {
  clearProductError,
  getAllProducts,
} from '../../store/slices/productSlice';
import Pagination from 'react-js-pagination';

const Products = () => {
  const { loading, products, resultPerPage, productsCount, error } =
    useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { keyword: key } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');

  const setCurrentPageNo = (page: number) => {
    setCurrentPage(page);
    console.log({ currentPage, resultPerPage, productsCount });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearProductError());
    }
    dispatch(getAllProducts({ keyword: key || '', currentPage, category }));
  }, [dispatch, currentPage, key, category, alert, error]);

  return (
    <>
      <MetaData title="Products" />
      <Header />
      <Stack my={20} sx={{ height: '100vh' }}>
        <Text align="center" size={30} weight={600}>
          Features Products
        </Text>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Divider color={'black'} />
        </div>
        <Group sx={{ padding: '2rem', alignItems: 'flex-start' }}>
          <Box sx={{ width: '20%', borderCollapse: 'collapse' }}>
            <Box
              sx={{
                padding: '1rem',
                border: '1px solid gray',
                color: mainOrangeColor,
                fontSize: '1.5rem',
              }}
            >
              CHOOES CATEGORY
            </Box>
            {categories.map((category, i) => (
              <Box
                key={i}
                sx={{
                  padding: '1rem',
                  border: '1px solid gray',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                className="linkHover"
                onClick={() => setCategory(category)}
              >
                {category}
              </Box>
            ))}
            <Box
              sx={{
                padding: '1rem',
                border: '1px solid gray',
                color: mainOrangeColor,
                fontSize: '1.5rem',
              }}
            >
              QUICK LINKS
            </Box>
            {quickLinks.map((item, i) => (
              <Link key={i} to={item.link} className="linkHover">
                <Box
                  key={i}
                  sx={{
                    padding: '1rem',
                    border: '1px solid gray',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Box>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: 'white',
              flex: 1,
            }}
          >
            <Group
              sx={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                padding: '0 2rem',
                height: '60vh',
              }}
              spacing={40}
            >
              {!loading &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </Group>
            <Group
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem',
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </Group>
          </Box>
        </Group>
      </Stack>
      <Footer />
    </>
  );
};

export default Products;

import { Stack, Text, Divider, Group, Box, Select, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { mainOrangeColor, smallScreenQuery } from '../../utils/constants';
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
import { Pagination } from '@mantine/core';
import { largeScreenQuery } from '../../utils/constants';
import { useMediaQuery } from '@mantine/hooks';

const Products = () => {
  const { loading, products, resultsPerPage, productsCount, error } =
    useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { keyword: key } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const largeScreen = useMediaQuery(largeScreenQuery);
  const smallScreen = useMediaQuery(smallScreenQuery);

  const setCurrentPageNo = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  const handleChangeCategory = (category: string) => {
    setCategory(category);
    setCurrentPageNo(1);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearProductError());
    }
    dispatch(getAllProducts({ keyword: key || '', currentPage, category }));
  }, [dispatch, currentPage, key, category, alert, error]);

  console.log({ resultsPerPage });

  return (
    <>
      <MetaData title="Products" />
      <Header />
      <Stack my={20}>
        <Text align="center" size={30} weight={600}>
          Features Products
        </Text>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Divider color={'black'} />
        </div>
        <Group
          sx={{
            padding: smallScreen ? '1rem' : '2rem',
            alignItems: 'flex-start',
            justifyContent: smallScreen ? 'center' : '',
          }}
        >
          {smallScreen ? (
            <Select
              placeholder="Choose a category"
              data={[
                {
                  value: '',
                  label: 'All',
                },
                ...categories.map((category) => ({
                  value: category,
                  label: category,
                })),
              ]}
              onChange={(category: string) => handleChangeCategory(category)}
            />
          ) : (
            <Box
              sx={{
                width: largeScreen ? '20%' : '30%',
                borderCollapse: 'collapse',
              }}
            >
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
                  onClick={() => handleChangeCategory(category)}
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
          )}

          <Group
            sx={{
              alignItems: 'flex-start',
              padding: '0 1rem',
              flex: 1,
            }}
            spacing={largeScreen ? 40 : 20}
          >
            {!loading &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </Group>
        </Group>
        <Group
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pagination
            onChange={setCurrentPageNo}
            total={Math.ceil(productsCount / resultsPerPage)}
            position="center"
            styles={(theme) => ({
              item: {
                '&[data-active]': {
                  backgroundImage: theme.fn.gradient({
                    from: 'red',
                    to: 'yellow',
                  }),
                },
              },
            })}
          />
        </Group>
      </Stack>
      <Footer />
    </>
  );
};

export default Products;

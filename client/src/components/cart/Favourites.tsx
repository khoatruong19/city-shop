import { Box, Button, Image, Stack, Table, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { addItemToCart } from '../../store/slices/cartSlice';
import { mainOrangeColor } from '../../utils/constants';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import FavouriteItemCard from './FavouriteItemCard';
import EmptyHeart from '../../images/like.png';
import { CartItem } from '../../utils/types/cart.type';
import toaster from '../../utils/helpers/toaster';
import { removeFavouriteItem } from '../../store/slices/favouriteSlice';

const Favourites = () => {
  const favouriteItems = useAppSelector(
    (state) => state.favourite.favouriteItems
  );
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string) => dispatch(removeFavouriteItem(id));
  const handleAddToCart = (product: CartItem) => {
    handleRemoveItem(product.product);
    if (cartItems.find((item) => item.product === product.product)) return;
    dispatch(addItemToCart(product));
    toaster({
      id: 'add-to-cart',
      message: 'Product added to cart!',
      success: true,
    });
  };

  return (
    <>
      <MetaData title="Favourites" />
      <Header />
      {favouriteItems.length === 0 ? (
        <Box
          sx={{
            width: 'fit-content',
            margin: '5rem auto',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '6rem',
              marginLeft: '8rem',
            }}
          >
            <Image className="img" alt="" src={EmptyHeart} />
          </Box>
          <Title order={1}>No Items In Favourites</Title>
          <Button
            size="md"
            color="orange"
            onClick={() => navigate('/products')}
            mt={10}
          >
            View Products
          </Button>
        </Box>
      ) : (
        <Stack
          sx={{
            width: '90vw',
            margin: '2rem auto',
          }}
        >
          <Table captionSide="bottom">
            <thead style={{ backgroundColor: mainOrangeColor }}>
              <tr>
                <th style={{ color: 'white' }}>Product</th>
                <th style={{ color: 'white' }}>Price</th>
                <th style={{ color: 'white' }}>Stock Status</th>
                <th style={{ color: 'white' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {favouriteItems.map((item) => (
                <tr
                  key={item.product}
                  style={{ borderBottom: '1px solid lightgray' }}
                >
                  <td>
                    <FavouriteItemCard
                      removeItem={handleRemoveItem}
                      item={item}
                    />
                  </td>
                  <td
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 500,
                    }}
                  >
                    ${item.price}
                  </td>
                  <td
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'green',
                    }}
                  >
                    {item.stock < 1 ? 'OutOfStock' : 'InStock'}
                  </td>
                  <td>
                    <Button
                      color={'orange'}
                      size={'md'}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      )}
    </>
  );
};

export default Favourites;

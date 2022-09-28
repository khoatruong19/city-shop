import { Stack, Text, Divider, Group } from '@mantine/core';
import { useAppSelector } from '../../store';
import ProductCard from './ProductCard';

const Product = () => {
  const { loading, products } = useAppSelector((state) => state.product);
  return (
    <Stack mt={20} sx={{ height: '100vh' }}>
      <Text align="center" size={30} weight={600}>
        Features Products
      </Text>
      <div style={{ width: '300px', margin: '0 auto' }}>
        <Divider color={'black'} />
      </div>
      <Group sx={{ justifyContent: 'space-between', padding: '10px' }}>
        {!loading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </Group>
    </Stack>
  );
};

export default Product;

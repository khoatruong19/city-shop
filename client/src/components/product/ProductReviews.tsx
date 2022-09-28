import { Box, Text, Divider, Stack, Textarea, Button } from '@mantine/core';
import React from 'react';
import { UserReview } from '../../utils/models/product.model';

interface IProps {
  numOfReviews: number;
  reviews: UserReview[];
}

const ProductReviews = ({ numOfReviews, reviews }: IProps) => {
  return (
    <Box>
      <Text size={40} weight={600} ml={'4rem'}>
        Reviews
      </Text>
      <Divider size={'sm'} />
      <Stack>
        {numOfReviews === 0 ? (
          <Text align="center" size={'lg'} mt={5}>
            No Reviews
          </Text>
        ) : (
          <p>show reviews</p>
        )}
      </Stack>
      <Box px={'4rem'} py={10}>
        <Text size={40} weight={600}>
          Add a Review
        </Text>
        <Text mb={5}>Your Rating*</Text>
        <Textarea placeholder="Your review" autosize minRows={4} />
        <Button
          style={{
            height: 42,
            width: 200,
            fontSize: '1.2rem',
            marginTop: '0.5rem',
          }}
          color={'red'}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductReviews;

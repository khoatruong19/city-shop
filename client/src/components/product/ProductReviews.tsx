import {
  Box,
  Text,
  Divider,
  Stack,
  Textarea,
  Button,
  Group,
} from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { UserReview } from '../../utils/models/product.model';
import ReactStars from 'react-rating-stars-component';
import {
  clearProductError,
  createProductReview,
} from '../../store/slices/productSlice';

interface IProps {
  numOfReviews: number;
  reviews: UserReview[];
}

const ProductReviews = ({ numOfReviews, reviews }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { reviewLoading, error } = useAppSelector((state) => state.product);
  const { id } = useParams();

  const [newReviews, setNewReviews] = useState<UserReview[]>(reviews || []);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const options = {
    value: rating,
    edit: true,
    isHalf: 0.5,
    size: 30,
  };

  const handleSubmitAddReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) navigate('/auth');

    dispatch(createProductReview({ id: id!, comment, rating }));

    if (error) return dispatch(clearProductError());

    const existingReview = newReviews.find((item) => item.user === user?._id);

    if (existingReview) {
      let tempReviews = [...newReviews];
      const reviewIndex = newReviews.findIndex(
        (item) => item.user === user?._id
      );
      tempReviews[reviewIndex] = { ...existingReview, rating, comment };
      console.log({ tempReviews });
      setNewReviews(tempReviews);
    } else {
      setNewReviews((prev) => [
        ...prev,
        {
          _id: comment.trim(),
          comment,
          name: user?.name!,
          user: user?._id!,
          rating,
          time: new Date().toString(),
        },
      ]);
    }

    setComment('');
    setRating(0);
  };

  console.log({ newReviews });

  return (
    <Box mb={40}>
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
          newReviews.map((review) => (
            <Box key={review._id}>{review.comment}</Box>
          ))
        )}
      </Stack>
      <Box px={'4rem'} py={10}>
        <Text size={40} weight={600}>
          Add a Review
        </Text>
        <Group>
          <Text mb={5}>Your Rating*</Text>
          <ReactStars
            {...options}
            onChange={(value: string) => setRating(parseFloat(value))}
          />
        </Group>
        <form onSubmit={handleSubmitAddReview}>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your review"
            autosize
            minRows={4}
            required
          />
          <Button
            style={{
              height: 42,
              width: 200,
              fontSize: '1.2rem',
              marginTop: '0.5rem',
            }}
            color={'red'}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProductReviews;

import {
  Box,
  Text,
  Divider,
  Stack,
  Textarea,
  Button,
  Group,
  Title,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { UserReview } from '../../utils/models/product.model';
import ReactStars from 'react-rating-stars-component';
import {
  clearProductError,
  createProductReview,
  deleteProductReview,
} from '../../store/slices/productSlice';
import moment from 'moment';
import 'moment/locale/vi';
import { TrashIcon } from '@heroicons/react/24/solid';
import toaster from '../../utils/helpers/toaster';
import { useMediaQuery } from '@mantine/hooks';
import { smallScreenQuery } from '../../utils/constants';

moment.locale('vi');

interface IProps {
  numOfReviews: number;
  reviews: UserReview[];
}

const ProductReviews = ({ numOfReviews, reviews }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { reviewLoading, error } = useAppSelector((state) => state.product);
  const { id: productId } = useParams();

  const [newReviews, setNewReviews] = useState<UserReview[]>(reviews || []);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const mobileScreen = useMediaQuery(smallScreenQuery);

  const options = {
    value: rating,
    edit: true,
    isHalf: 0.5,
    size: 30,
  };

  const handleSubmitAddReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) navigate('/auth');

    dispatch(createProductReview({ id: productId!, comment, rating }));

    const newReview = {
      _id: comment.trim(),
      comment,
      name: user?.name!,
      user: user?._id!,
      rating,
      time: new Date().toString(),
    };
    if (newReviews.length === 0) {
      setNewReviews([newReview]);
      window.location.reload();
    }
    const existingReview = newReviews.find((item) => item.user === user?._id);

    if (existingReview) {
      let tempReviews = [...newReviews];

      const reviewIndex = newReviews.findIndex(
        (item) => item.user === user?._id
      );
      tempReviews[reviewIndex] = { ...existingReview, rating, comment };
      setNewReviews(tempReviews);
    } else {
      setNewReviews((prev) => [...prev, newReview]);
    }
    setComment('');
    setRating(0);
  };

  const handleDeleteReview = (reviewId: string) => {
    dispatch(deleteProductReview({ productId: productId!, reviewId }));
    if (error) {
      toaster({ id: 'delete-review', message: error });
      return dispatch(clearProductError());
    }
    let tempReviews = newReviews.filter((item) => item._id !== reviewId);
    setNewReviews(tempReviews);
  };

  useEffect(() => {
    if (error) {
      toaster({ id: 'create-review', message: error });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <Box mb={40}>
      <Text size={40} weight={600} ml={mobileScreen ? '' : '4rem'}>
        Reviews
      </Text>
      <Divider size={'sm'} />
      <Stack>
        {numOfReviews === 0 ? (
          <Text align="center" size={'lg'} mt={5}>
            No Reviews
          </Text>
        ) : (
          <Stack pl={mobileScreen ? '' : '4rem'} mt={20} spacing={20}>
            {newReviews.map((review) => (
              <Box key={review._id}>
                <Group spacing={8}>
                  <Title order={4}>{review.name}</Title>
                  <Text color={'gray'}>{moment(review.time).format('L')}</Text>
                  {user?._id === review.user && (
                    <TrashIcon
                      onClick={() => handleDeleteReview(review._id)}
                      className="footerIcon hover"
                      style={{ color: 'red' }}
                    />
                  )}
                </Group>
                <Text>{review.comment}</Text>
                <ReactStars
                  size={20}
                  value={review.rating}
                  edit={false}
                  isHalf={true}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
      <Box px={mobileScreen ? '1rem' : '4rem'} py={10}>
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
            loading={reviewLoading}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProductReviews;

import { Static, Type } from '@sinclair/typebox';

const productImage = Type.Object({
  _id: Type.Optional(Type.String()),
  public_id: Type.String(),
  url: Type.String(),
});

const userReview = Type.Object({
  _id: Type.String(),
  user: Type.String(),
  name: Type.String(),
  comment: Type.String(),
  rating: Type.Number(),
  time: Type.String(),
});

const product = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  price: Type.Number(),
  images: Type.Array(productImage),
  category: Type.String(),
  discountPrice: Type.Optional(Type.String()),
  stock: Type.Number(),
  ratings: Type.Number(),
  numOfReviews: Type.Number(),
  reviews: Type.Array(userReview),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const productResponseSuccess = Type.Object({
  message: Type.String(),
  product: Type.Optional(product),
  products: Type.Optional(Type.Array(product)),
  productsCount: Type.Optional(Type.String()),
  resultsPerPage: Type.Optional(Type.Number()),
});

const productResponseFailure = Type.Object({
  message: Type.String(),
  error: Type.String(),
  statusCode: Type.Number(),
});

const productUDResponse = Type.Object({
  message: Type.String(),
  success: Type.Boolean(),
});

const productReviewsResponse = Type.Object({
  message: Type.String(),
  reviews: Type.Array(userReview),
});

const paramsJsonSchema = Type.Object({
  id: Type.String(),
});

export const getAllProductsSchema = {
  tags: ['product'],
  description: 'Gell all products resource',
  query: {
    keyword: Type.String(),
    category: Type.String(),
  },
  response: {
    200: productResponseSuccess,
  },
};

export const getAllProductsByAdminSchema = {
  tags: ['product'],
  description: 'Gell all products resource',
  response: {
    200: productResponseSuccess,
  },
};

export const createProductSchema = {
  tags: ['product'],
  description: 'Create a product resource',
  body: Type.Object({
    name: Type.String(),
    description: Type.String({
      default: 'No description...',
    }),
    price: Type.Number(),
    stock: Type.Number(),
    category: Type.String(),
    offerPrice: Type.Optional(Type.String()),
    images: Type.Unknown(),
  }),
  response: {
    201: productResponseSuccess,
  },
};

export const updateProductSchema = {
  tags: ['product'],
  description: 'Update a product resource',
  body: Type.Object({
    name: Type.Optional(Type.String({})),
    description: Type.Optional(Type.String()),
    price: Type.Optional(Type.Number()),
    stock: Type.Optional(Type.Number()),
    category: Type.Optional(Type.String()),
    images: Type.Optional(Type.Unknown()),
  }),
  params: paramsJsonSchema,
  response: {
    200: productResponseSuccess,
    404: productResponseFailure,
  },
};

export const deleteProductSchema = {
  tags: ['product'],
  description: 'Delete a product resource',
  params: paramsJsonSchema,
  response: {
    200: productResponseSuccess,
    404: productResponseFailure,
  },
};

export const getProductDetailSchema = {
  tags: ['product'],
  description: 'Get a product resource',
  params: paramsJsonSchema,
  response: {
    200: productResponseSuccess,
    404: productResponseFailure,
  },
};

export const createProductReviewSchema = {
  tags: ['product'],
  description: 'Create product review',
  params: paramsJsonSchema,
  body: Type.Object({
    rating: Type.Number(),
    comment: Type.String(),
  }),
  response: {
    200: productUDResponse,
    404: productResponseFailure,
  },
};

export const getSingleProductReviewsSchema = {
  tags: ['product'],
  description: 'Get product reviews',
  params: paramsJsonSchema,
  response: {
    200: productReviewsResponse,
    404: productResponseFailure,
  },
};

export const deleteProductReviewSchema = {
  tags: ['product'],
  description: 'Delete product review',
  params: paramsJsonSchema,
  query: {
    reviewId: Type.String(),
  },
  response: {
    200: productUDResponse,
    404: productResponseFailure,
  },
};

export type CreateProductBody = Static<typeof createProductSchema.body>;
export type UpdateProductBody = Static<typeof updateProductSchema.body>;
export type CreateProductReviewBody = Static<
  typeof createProductReviewSchema.body
>;

export type UserReviewType = Static<typeof userReview>;

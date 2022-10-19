import { FastifyReply, FastifyRequest } from 'fastify';
import mongoose from 'mongoose';
import { ApiError } from '../../utils/helpers/error';
import { JwtPayload } from '../../utils/interfaces';
import { logger } from '../../utils/logger';
import { QueryRequest } from '../../utils/types';
import {
  CreateProductBody,
  CreateProductReviewBody,
  UpdateProductBody,
} from './product.schema';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProductDetail,
  createProductReview,
  deleteProductReview,
  getAllProductsByAdmin,
} from './product.service';
import { v2 as cloudinary } from 'cloudinary';

export async function getAllProductsHandler(
  request: QueryRequest,
  reply: FastifyReply
) {
  try {
    const { products, productsCount, resultsPerPage } = await getAllProducts(
      request.query
    );
    reply.send({
      message: 'Get all products successfully!',
      products,
      productsCount,
      resultsPerPage,
    });
  } catch (error) {
    logger.info(`Get all products error, `, error);
    throw new ApiError(400, 'Get all products error!').getErrorObject(reply);
  }
}

export async function getAllProductsByAdminHandler(
  request: QueryRequest,
  reply: FastifyReply
) {
  try {
    const { products, productsCount } = await getAllProductsByAdmin();
    reply.send({
      message: 'Get all products by admin successfully!',
      products,
      productsCount,
    });
  } catch (error) {
    logger.info(`Get all products by admin error, `, error);
    throw new ApiError(400, 'Get all products by admin error!').getErrorObject(
      reply
    );
  }
}

export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductBody;
  }>,
  reply: FastifyReply
) {
  try {
    const product = await createProduct(request.body);
    return reply.status(201).send({
      message: 'Create product successfully!',
      product,
    });
  } catch (error) {
    logger.info(`Create product error, ${error}`);
    throw new ApiError(400, 'Create product error!').getErrorObject(reply);
  }
}

export async function updateProductHandler(
  request: FastifyRequest<{
    Body: UpdateProductBody;
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const product = await updateProduct({
      ...request.body,
      productId: request.params.id,
    });

    if (!product)
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );

    return reply.status(200).send({
      message: 'Product updated!',
      product,
    });
  } catch (error) {
    logger.info(`Update product error, ${error}`);
    throw new ApiError(400, 'Update product error!').getErrorObject(reply);
  }
}

export async function deleteProductHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const productDeleted = await deleteProduct(request.params.id);
    if (!productDeleted) {
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );
    }
    reply.status(200).send({
      message: 'Product deleted!',
      success: true,
    });
  } catch (error) {
    logger.info(`Delete product error, ${error}`);
    throw new ApiError(400, 'Delete product error!').getErrorObject(reply);
  }
}

export async function getProductDetailHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const product = await getProductDetail(request.params.id);
    if (!product) {
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );
    }
    return reply.status(200).send({
      message: 'Get product detail!',
      product,
    });
  } catch (error) {
    logger.info(`Get product detail error, ${error}`);
    throw new ApiError(404, 'Get product detail error').getErrorObject(reply);
  }
}

export async function createProductReviewHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
    Body: CreateProductReviewBody;
  }>,
  reply: FastifyReply
) {
  try {
    const { rating, comment } = request.body;
    const userPayload = request.user as JwtPayload;

    const review = {
      user: userPayload.id,
      name: userPayload.name,
      rating,
      comment,
    };

    const reviewCreated = await createProductReview({
      productId: request.params.id,
      review,
    });

    if (!reviewCreated)
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );
    reply.send({
      success: true,
      message: 'Review created!',
    });
  } catch (error) {
    logger.info(`Create product review error, ${error}`);
    throw new ApiError(404, 'Create product review error').getErrorObject(
      reply
    );
  }
}

export async function getSingleProductReviewsHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const product = await getProductDetail(request.params.id);
    if (!product) {
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );
    }
    return reply.status(200).send({
      message: 'Get product reviews!',
      reviews: product.reviews,
    });
  } catch (error) {
    logger.info(`Get product reviews error, ${error}`);
    throw new ApiError(404, 'Get product reviews error').getErrorObject(reply);
  }
}

export async function deleteProductReviewHandler(
  request: FastifyRequest<{
    Params: {
      id: mongoose.Types.ObjectId;
    };
    Querystring: {
      reviewId: mongoose.Types.ObjectId;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const productDeleted = await deleteProductReview({
      productId: request.params.id,
      reviewId: request.query.reviewId,
    });
    if (!productDeleted) {
      throw new ApiError(404, 'Product not found with this ID').getErrorObject(
        reply
      );
    }
    return reply.status(200).send({
      success: true,
      message: 'Deleted product review!',
    });
  } catch (error) {
    logger.info(`Delete product review error, ${error}`);
    throw new ApiError(404, 'Delete product review error').getErrorObject(
      reply
    );
  }
}

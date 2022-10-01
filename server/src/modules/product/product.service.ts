import mongoose, { Types } from 'mongoose';
import { Features } from '../../utils/features';
import {
  CreateProductReviewInput,
  DeleteProductReviewInput,
  UpdateProductStockInput,
} from '../../utils/types';
import { Product, ProductModel, UserReview } from './product.model';
import { CreateProductBody, UpdateProductBody } from './product.schema';
import { v2 as cloudinary } from 'cloudinary';

export async function getAllProducts(queryStr: {
  keyword: string;
  category: string;
  page: string;
}): Promise<Product[]> {
  if (Object.keys(queryStr).length === 0)
    return await ProductModel.find().select('+review.user');
  const resultsPerPage = 8;
  const searchFeature = new Features(ProductModel.find(), queryStr)
    .search()
    .filter()
    .pagination(resultsPerPage);
  return await searchFeature.query;
}

export async function createProduct(
  input: CreateProductBody
): Promise<Product> {
  return await ProductModel.create({
    ...input,
  });
}

export async function updateProduct(
  input: UpdateProductBody & { productId: mongoose.Types.ObjectId }
): Promise<Product | null> {
  const { productId, ...data } = input;
  console.log({ input });
  let product = await ProductModel.findById(productId);

  if (!product) return null;
  product = await ProductModel.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  return product;
}

export async function deleteProduct(
  productId: mongoose.Types.ObjectId
): Promise<boolean> {
  let product = await ProductModel.findById(productId);

  if (!product) return false;

  for (let i = 0; 1 < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  return true;
}

export async function getProductDetail(
  productId: mongoose.Types.ObjectId
): Promise<Product | null> {
  const product = await ProductModel.findById(productId);

  if (!product) return null;

  return product;
}

export async function createProductReview(
  input: CreateProductReviewInput
): Promise<boolean> {
  const { productId, review } = input;
  const product = await ProductModel.findById(productId);

  if (!product) return false;

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === review.user.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === review.user.toString()) {
        rev.rating = review.rating;
        rev.comment = review.comment;
      }
    });
  } else {
    product.reviews.push({ ...review, time: new Date() });
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await ProductModel.updateOne(
    { _id: product._id },
    {
      $set: {
        ...product,
      },
    }
  );

  return true;
}

export async function deleteProductReview(
  input: DeleteProductReviewInput
): Promise<boolean> {
  const { productId, reviewId } = input;
  const product = await ProductModel.findById(productId);

  if (!product) return false;

  let reviews = product.reviews as any[];
  reviews = reviews.filter((rev) => rev._id.toString() !== reviewId.toString());

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await ProductModel.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return true;
}

export async function updateStock({
  productId,
  quantity,
}: UpdateProductStockInput): Promise<boolean> {
  const product = await ProductModel.findById(productId);

  if (!product) return false;

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });

  return true;
}

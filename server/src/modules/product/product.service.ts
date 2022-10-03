import mongoose, { Types } from 'mongoose';
import { Features } from '../../utils/features';
import {
  CreateProductReviewInput,
  DeleteProductReviewInput,
  GetProductsWithCount,
  UpdateProductStockInput,
} from '../../utils/types';
import { Product, ProductModel, UserReview } from './product.model';
import { CreateProductBody, UpdateProductBody } from './product.schema';
import { v2 as cloudinary } from 'cloudinary';

export async function getAllProducts(queryStr: {
  keyword: string;
  category: string;
  page: string;
}): Promise<GetProductsWithCount> {
  const productsCount = await ProductModel.countDocuments();
  const resultsPerPage = 10;
  if (Object.keys(queryStr).length === 0) {
    const products = await ProductModel.find().select('+review.user');
    return {
      products,
      resultsPerPage,
      productsCount,
    };
  }

  const searchFeature = new Features(ProductModel.find(), queryStr)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await searchFeature.query;
  return {
    products,
    resultsPerPage,
    productsCount,
  };
}

export async function createProduct(
  input: CreateProductBody
): Promise<Product> {
  const { images: bodyImages, ...rest } = input;
  let images: string[] = [];

  if (typeof bodyImages === 'string') {
    images.push(bodyImages);
  } else {
    images = bodyImages as string[];
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  return await ProductModel.create({
    ...rest,
    images: imagesLinks,
  });
}

export async function updateProduct(
  input: UpdateProductBody & { productId: mongoose.Types.ObjectId }
): Promise<Product | null> {
  const { productId, images: bodyImages, ...data } = input;
  let product = await ProductModel.findById(productId);

  if (!product) return null;
  let images: string[] = [];
  const imagesLinks = [];

  if (typeof bodyImages === 'string') {
    images.push(bodyImages);
  } else {
    images = bodyImages as string[];
  }

  if (images !== undefined) {
    // Delete image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: 'products',
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

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

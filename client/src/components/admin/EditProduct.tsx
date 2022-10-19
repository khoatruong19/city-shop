import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  InboxStackIcon,
  ListBulletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PencilSquareIcon, TagIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Group,
  Image,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearProductError,
  createProduct,
  getProductDetail,
} from '../../store/slices/productSlice';
import { categories } from '../../utils/data';
import toaster from '../../utils/helpers/toaster';
import { ImageModel } from '../../utils/models/others.model';
import AdminLayout from '../layout/AdminLayout';

const EditProduct = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.product);
  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [offerPrice, setOfferPrice] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const [oldImages, setOldImages] = useState<ImageModel[]>([]);

  const handleChangeCategory = (category: string) => {
    setCategory(category);
  };

  const handleAddProductImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteProductImage = (index: number) => {
    const tempImages = images.filter((_image, i) => i !== index);
    setImages(tempImages);
  };

  const handleEditProductSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await dispatch(
      createProduct({
        name,
        category,
        description,
        images,
        price,
        stock,
        offerPrice,
      })
    );

    toaster({
      id: 'update-product',
      message: 'Product updated!',
      success: true,
    });
  };

  useEffect(() => {
    if (error) {
      toaster({ id: 'update-product', message: error });
      dispatch(clearProductError());
    }
  }, [error]);

  useEffect(() => {
    if (product && id && product._id !== id) {
      dispatch(getProductDetail(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOfferPrice(product.offerPrice);
      setOldImages(product.images);
    }
  }, [id, dispatch, product]);

  console.log({ product });

  return (
    <AdminLayout>
      <Group
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'lightgray',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '50%',
            padding: '2.5rem 2rem',
            backgroundColor: 'whitesmoke',
            borderRadius: '15px',
          }}
        >
          <Title order={1} align="center" mb={20}>
            Update Product
          </Title>
          <form action="" onSubmit={handleEditProductSubmit}>
            <Stack>
              <TextInput
                placeholder="Product Name"
                icon={
                  <PencilSquareIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                size="md"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextInput
                placeholder="Discount Percent *optional"
                icon={
                  <TagIcon className="footerIcon" style={{ color: 'gray' }} />
                }
                size="md"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
              <NumberInput
                icon={
                  <CurrencyDollarIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                placeholder="Product Price"
                size="md"
                required
                value={price}
                onChange={(value) => setPrice(Number(value))}
              />
              <Textarea
                placeholder="Product Description"
                icon={
                  <DocumentTextIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                size="md"
                autosize={true}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Select
                value={category}
                required
                size="md"
                icon={
                  <ListBulletIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                placeholder="Choose a category"
                data={[
                  ...categories.map((category) => ({
                    value: category,
                    label: category,
                  })),
                ]}
                onChange={(category: string) => handleChangeCategory(category)}
              />
              <NumberInput
                icon={
                  <InboxStackIcon
                    className="footerIcon"
                    style={{ color: 'gray' }}
                  />
                }
                placeholder="Stock"
                size="md"
                required
                value={stock}
                onChange={(value) => setStock(Number(value))}
              />
              <Group>
                <TextInput
                  onChange={handleAddProductImages}
                  ref={fileRef}
                  type="file"
                  sx={{ display: 'none' }}
                  required
                  accept="image/*"
                  multiple
                />
                <Button
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'lightgray',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'gray',
                    },
                  }}
                  onClick={() => fileRef.current?.click()}
                >
                  Choose images
                </Button>
                <Group
                  sx={{ height: '6rem', overflowY: 'scroll', width: '100%' }}
                >
                  {oldImages.map((image, i) => (
                    <Box key={i} sx={{ position: 'relative', width: '5rem' }}>
                      <Image alt="" src={image.url} className="img" />
                      <XMarkIcon
                        className="footerIcon hover"
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-5px',
                        }}
                        onClick={() => handleDeleteProductImage(i)}
                      />
                    </Box>
                  ))}
                  {images.map((image, i) => (
                    <Box key={i} sx={{ position: 'relative', width: '5rem' }}>
                      <Image alt="" src={image} className="img" />
                      <XMarkIcon
                        className="footerIcon hover"
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-5px',
                        }}
                        onClick={() => handleDeleteProductImage(i)}
                      />
                    </Box>
                  ))}
                </Group>
              </Group>
              <Button
                loading={loading}
                type="submit"
                color="orange"
                size="lg"
                mt={10}
              >
                Update
              </Button>
            </Stack>
          </form>
        </Box>
      </Group>
    </AdminLayout>
  );
};

export default EditProduct;

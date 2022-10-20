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
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearProductError,
  createProduct,
} from '../../store/slices/productSlice';
import { categories } from '../../utils/data';
import toaster from '../../utils/helpers/toaster';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';

const CreateProduct = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.product);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [offerPrice, setOfferPrice] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);

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

  const handleCreateProductSubmit = async (
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
      id: 'create-product',
      message: 'Product created!',
      success: true,
    });
  };

  useEffect(() => {
    if (error) {
      toaster({ id: 'create-product', message: error });
      dispatch(clearProductError());
    }
  }, [error]);

  return (
    <>
      <MetaData title="Create Product" />
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
              Create Product
            </Title>
            <form action="" onSubmit={handleCreateProductSubmit}>
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
                  onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                  placeholder="Discount Percent *optional"
                  icon={
                    <TagIcon className="footerIcon" style={{ color: 'gray' }} />
                  }
                  size="md"
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
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select
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
                  onChange={(category: string) =>
                    handleChangeCategory(category)
                  }
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
                  <Group>
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
                  Create
                </Button>
              </Stack>
            </form>
          </Box>
        </Group>
      </AdminLayout>
    </>
  );
};

export default CreateProduct;

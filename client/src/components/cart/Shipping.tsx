import { BuildingOffice2Icon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { HomeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Divider,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { saveShippingInfo } from '../../store/slices/cartSlice';
import { ShippingInfo } from '../../utils/types/cart.type';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
  const shippingInfo = useAppSelector((state) => state.cart.shippingInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<ShippingInfo>({
    initialValues: {
      address: shippingInfo.address || '',
      state: shippingInfo.state || '',
      country: shippingInfo.country || '',
      phoneNo: shippingInfo.phoneNo || '',
    },
    validate: {
      country: (value) =>
        value.length < 2 ? 'This field cannot be empty!' : null,
    },
  });

  const handleShippingSubmit = (values: ShippingInfo) => {
    dispatch(saveShippingInfo(values));
    navigate('/order/confirm');
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <Header />
      <CheckoutSteps activeStep={0} />
      <Box sx={{ width: 'max-content', margin: '0 auto', textAlign: 'center' }}>
        <Text size={25} color="gray">
          Shipping Details
        </Text>
        <Box sx={{ width: 300, marginTop: 10 }}>
          <Divider size={'md'} />
        </Box>
        <form action="" onSubmit={form.onSubmit(handleShippingSubmit)}>
          <Stack spacing={20} mt={30}>
            <TextInput
              placeholder="Address"
              size="md"
              icon={<HomeIcon className="footerIcon" />}
              {...form.getInputProps('address')}
              required={true}
            />
            <TextInput
              placeholder="Phone Number"
              size="md"
              icon={<PhoneIcon className="footerIcon" />}
              {...form.getInputProps('phoneNo')}
              required={true}
            />

            <Select
              icon={<GlobeAltIcon className="footerIcon" />}
              placeholder="Country"
              searchable
              size="md"
              {...form.getInputProps('country')}
              required={true}
              data={
                Country &&
                Country.getAllCountries().map((item) => {
                  return {
                    label: item.name,
                    value: item.isoCode,
                  };
                })
              }
            />
            {form.values.country && (
              <Select
                icon={<BuildingOffice2Icon className="footerIcon" />}
                placeholder="State"
                searchable
                size="md"
                {...form.getInputProps('state')}
                data={
                  State &&
                  State.getStatesOfCountry(form.values.country).map((item) => {
                    return {
                      label: item.name,
                      value: item.isoCode,
                    };
                  })
                }
              />
            )}
            <Button type="submit" size="md" color={'orange'}>
              Continue
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Shipping;

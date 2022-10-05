import React from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
    </>
  );
};

export default ConfirmOrder;

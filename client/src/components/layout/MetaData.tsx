import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaData = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;

import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="4"
        animationDuration="0.75"
        visible={true}
      />
    </LoaderWrapper>
  );
};

export default Loader;

import React from 'react';

import { LoadMoreButton } from './Button.styled';

// Оголошення функційного компоненту Button з параметром onClick
export const Button = ({ onClick }) => {
  return (
    <div>
      <LoadMoreButton type="button" onClick={onClick}>
        load more
      </LoadMoreButton>
    </div>
  );
};
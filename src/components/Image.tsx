import React, { useEffect, useState } from 'react';
import { getFileById, getImageUrl } from '../helpers/utils.ts';

function Image(props: any) {
  return (
    <img
      {...props}
      style={{ objectFit: 'cover' }}
      src={getImageUrl(props.id)}
      alt={props.id}
    />
  );
}

export default Image;

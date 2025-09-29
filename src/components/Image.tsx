import React, { useEffect, useState } from 'react';
import { getFileById } from '../helpers/utils.ts';

function Image({ item }: any) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (item?.filesIds?.[0]) {
      getFileById(item.filesIds[0]).then((url) => {
        setImgUrl(url);
      });
    }
  }, [item?.filesIds]);
  return (
    <img
      style={{ objectFit: 'cover' }}
      src={imgUrl}
      alt={item?.title}
    />
  );
}

export default Image;

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MyImageProps {
  src?: string;
  alt?: string;
  defaultImage: string;
  defaultAlt?: string;
  width?: number;
  height?: number;
  [key: string]: string | number | undefined | boolean | object;
}

const MyImage = ({ src, alt, defaultImage, defaultAlt, ...props }: MyImageProps) => {
  const fallback = defaultImage;
  const [imageSrc, setImageSrc] = useState(src ?? fallback);

  useEffect(() => {
    setImageSrc(src ?? fallback);
  }, [src, fallback]);

  const handleError = () => {
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt ?? defaultAlt ?? 'Image not available'}
      onError={handleError}
      loading="lazy"
      {...props}
      width={props.width ?? 500}
      height={props.height ?? 500}
      placeholder="blur"
      blurDataURL={defaultImage}
    />
  );
};

export default MyImage;
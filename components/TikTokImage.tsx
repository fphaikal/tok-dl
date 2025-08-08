import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface TikTokImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
}

export default function TikTokImage({ src, alt, className, ...props }: TikTokImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a placeholder image
      setImgSrc('/placeholder-avatar.svg');
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      unoptimized={true}
      {...props}
    />
  );
}

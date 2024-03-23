import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { IMAGE_SRC } from './ImageSrc';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  src: ${IMAGE_SRC};
`;

export const HeroImage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const updateImageSize = useCallback(() => {
    const image = imageRef.current;
    if (!image) {
      return;
    }
    const width = image.clientWidth;
    const height = (width / 16) * 9;
    image.width = width;
    image.height = height;
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) {
      return;
    }
    image.src = IMAGE_SRC;
    updateImageSize();

    const resizeObserver = new ResizeObserver(() => {
      updateImageSize();
    });

    resizeObserver.observe(image);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateImageSize]);

  return (
    <_Wrapper>
      <_Image ref={imageRef} alt="Cyber TOON" />
    </_Wrapper>
  );
};

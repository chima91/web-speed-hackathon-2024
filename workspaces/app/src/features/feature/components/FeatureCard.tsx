import { Suspense } from 'react';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { useBook } from '../../book/hooks/useBook';

type Props = {
  bookId: string;
};

const FeatureCard: React.FC<Props> = ({ bookId }) => {
  const { data: book } = useBook({ params: { bookId } });

  const imageUrl = useImage({ height: 96, imageId: book.image.id, width: 96 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <Link
      href={`/books/${bookId}`}
      style={{
        backgroundColor: Color.MONO_A,
        border: `1px solid ${Color.MONO_30}`,
        borderRadius: Radius.SMALL,
        display: 'grid',
        flexShrink: '0',
        gap: `${Space * 1}px`,
        gridTemplateColumns: 'auto 1fr',
        padding: `${Space * 1.5}px`,
      }}
    >
      {imageUrl != null && (
        <div style={{ height: '96px', width: '96px' }}>
          <Image
            alt={book.image.alt}
            height={96}
            objectFit="cover"
            src={imageUrl}
            style={{ borderRadius: Radius.SMALL }}
            width={96}
          />
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: `${Space * 1}px`,
          maxWidth: '200px',
          width: '100%',
        }}
      >
        <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
          {book.name}
        </Text>
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
          {book.description}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          {authorImageUrl != null && (
            <div style={{ height: '32px', width: '32px' }}>
              <Image
                alt={book.author.name}
                height={32}
                objectFit="cover"
                src={authorImageUrl}
                style={{ borderRadius: '50%' }}
                width={32}
              />
            </div>
          )}
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            {book.author.name}
          </Text>
        </Flex>
      </div>
    </Link>
  );
};

const FeatureCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <FeatureCard {...props} />
    </Suspense>
  );
};

export { FeatureCardWithSuspense as FeatureCard };

import { Suspense } from 'react';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { useBook } from '../hooks/useBook';

type Props = {
  bookId: string;
};

const BookCard: React.FC<Props> = ({ bookId }) => {
  const { data: book } = useBook({ params: { bookId } });

  const imageUrl = useImage({ height: 128, imageId: book.image.id, width: 192 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <Link
      href={`/books/${bookId}`}
      style={{
        backgroundColor: `${Color.MONO_A}`,
        border: `1px solid ${Color.MONO_30}`,
        borderRadius: `${Radius.SMALL}`,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '192px',
      }}
    >
      {imageUrl != null && (
        <div style={{ borderRadius: `${Radius.SMALL} ${Radius.SMALL} 0 0` }}>
          <Image alt={book.image.alt} height={128} objectFit="cover" src={imageUrl} width={192} />
        </div>
      )}

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Text color={Color.MONO_100} typography={Typography.NORMAL14} weight="bold">
          {book.name}
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
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            {book.author.name}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

const BookCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <BookCard {...props} />
    </Suspense>
  );
};

export { BookCardWithSuspense as BookCard };

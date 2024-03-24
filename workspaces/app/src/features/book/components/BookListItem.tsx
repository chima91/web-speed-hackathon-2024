import { memo } from 'react';

import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

type Props = {
  book: Omit<GetBookListResponse[number], 'nameRuby' | 'author'>;
};

const BookListItemMemo: React.FC<Props> = memo(({ book }) => {
  const imageUrl = useImage({ height: 64, imageId: book.image.id, width: 64 });

  return (
    <li style={{ width: '100%' }}>
      <Link href={`/books/${book.id}`} style={{ width: '100%' }}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          {imageUrl != null && (
            <div
              style={{
                height: '64px',
                width: '64px',
              }}
            >
              <Image
                alt={book.name}
                height={64}
                objectFit="cover"
                src={imageUrl}
                style={{ borderRadius: Radius.SMALL }}
                width={64}
              />
            </div>
          )}
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </Link>
    </li>
  );
});

BookListItemMemo.displayName = 'BookListItem';
export { BookListItemMemo as BookListItem };

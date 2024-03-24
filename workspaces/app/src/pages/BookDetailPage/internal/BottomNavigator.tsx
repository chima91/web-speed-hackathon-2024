import { useCallback } from 'react';
import { keyframes } from 'styled-components';

import { Link } from '../../../foundation/components/Link';
import { Color, Radius, Space } from '../../../foundation/styles/variables';

import { FavButton } from './FavButton';

type Props = {
  bookId: string;
  isFavorite: boolean;
  latestEpisodeId: string;
  onClickFav: () => void;
};

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const BottomNavigator: React.FC<Props> = ({ bookId, isFavorite, latestEpisodeId, onClickFav }) => {
  const handleFavClick = useCallback(() => {
    onClickFav();
  }, [onClickFav]);

  return (
    <div
      style={{
        bottom: `${Space * 4}px`,
        left: '50%',
        position: 'fixed',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        style={{
          animation: `${slideIn} 0.3s ease-out`,
          backgroundColor: `${Color.MONO_A}`,
          borderRadius: `calc(${Radius.X_LARGE} + ${Space * 1}px)`,
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: `${Space * 1}px`,
          justifyContent: 'center',
          minWidth: '296px',
          padding: `${Space * 1}px`,
        }}
      >
        <FavButton enabled={isFavorite} onClick={handleFavClick} />
        <Link
          style={{
            backgroundColor: Color.Primary,
            borderRadius: Radius.X_LARGE,
            color: Color.MONO_100,
            display: 'block',
            flexShrink: '0',
            fontWeight: 'bold',
            padding: `${Space * 2}px ${Space * 8}px`,
          }}
          to={`/books/${bookId}/episodes/${latestEpisodeId}`}
        >
          最新話を読む
        </Link>
      </div>
    </div>
  );
};

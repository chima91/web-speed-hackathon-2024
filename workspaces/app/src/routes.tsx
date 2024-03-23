import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SvgIcon } from './features/icons/components/SvgIcon';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Typography } from './foundation/styles/variables';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { EpisodeDetailPage } from './pages/EpisodeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { TopPage } from './pages/TopPage';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />} path={'/'}>
        <Route element={<TopPage />} path={''} />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <Link
                href={'/'}
                style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                <SvgIcon color={Color.MONO_100} height={32} type="ArrowBack" width={32} />
                <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                  トップへ戻る
                </Text>
              </Link>
            }
          />
        }
        path={'/'}
      >
        <Route element={<BookDetailPage />} path={'books/:bookId'} />
        <Route element={<EpisodeDetailPage />} path={'books/:bookId/episodes/:episodeId'} />
        <Route element={<AuthorDetailPage />} path={'authors/:authorId'} />
        <Route element={<SearchPage />} path={'search'} />
      </Route>
    </Routes>
  );
};

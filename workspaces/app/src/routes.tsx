import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SvgIcon } from './features/icons/components/SvgIcon';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Typography } from './foundation/styles/variables';

const TopPage = lazy(() => import('./pages/TopPage'));
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'));
const EpisodeDetailPage = lazy(() => import('./pages/EpisodeDetailPage'));
const AuthorDetailPage = lazy(() => import('./pages/AuthorDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />} path="/">
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <TopPage />
            </Suspense>
          }
          path=""
        />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <Link
                href="/"
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
        path="/"
      >
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BookDetailPage />
            </Suspense>
          }
          path="books/:bookId"
        />
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EpisodeDetailPage />
            </Suspense>
          }
          path="books/:bookId/episodes/:episodeId"
        />
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthorDetailPage />
            </Suspense>
          }
          path="authors/:authorId"
        />
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SearchPage />
            </Suspense>
          }
          path="search"
        />
      </Route>
    </Routes>
  );
};

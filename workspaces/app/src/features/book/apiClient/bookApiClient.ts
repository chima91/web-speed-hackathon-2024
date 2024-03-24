import { inject } from 'regexparam';

import type { GetBookListRequestQuery } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';
import type { GetBookRequestParams } from '@wsh-2024/schema/src/api/books/GetBookRequestParams';
import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type BookApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetBookRequestParams }, GetBookResponse];
  fetchList: [{ query: GetBookListRequestQuery }, GetBookListResponse];
}>;

export const bookApiClient: BookApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/books/:bookId', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetBookResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/books/:bookId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    if (query.authorId) params.append('authorId', query.authorId.toString());
    if (query.authorName) params.append('authorName', query.authorName);
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.name) params.append('name', query.name);
    if (query.offset) params.append('offset', query.offset.toString());
    let url = `/api/v1/books`;
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetBookListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/books`,
    ...options,
  }),
};

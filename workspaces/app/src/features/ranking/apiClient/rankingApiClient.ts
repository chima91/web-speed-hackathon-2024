import type { GetRankingListRequestQuery } from '@wsh-2024/schema/src/api/rankings/GetRankingListRequestQuery';
import type { GetRankingListResponse } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type RankingApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetRankingListRequestQuery }, GetRankingListResponse];
}>;

export const rankingApiClient: RankingApiClient = {
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.offset) params.append('offset', query.offset.toString());
    let url = `/api/v1/rankings`;
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetRankingListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/rankings`,
    ...options,
  }),
};

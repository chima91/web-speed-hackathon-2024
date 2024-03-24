import type { GetFeatureListRequestQuery } from '@wsh-2024/schema/src/api/features/GetFeatureListRequestQuery';
import type { GetFeatureListResponse } from '@wsh-2024/schema/src/api/features/GetFeatureListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type FeatureApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetFeatureListRequestQuery }, GetFeatureListResponse];
}>;

export const featureApiClient: FeatureApiClient = {
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.offset) params.append('offset', query.offset.toString());
    let url = `/api/v1/features`;
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetFeatureListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/features`,
    ...options,
  }),
};

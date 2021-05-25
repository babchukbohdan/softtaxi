import { environment } from 'src/environments/environment';

export const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

export const transformRequests = (requests) => {
  if (!requests.length) {
    return [];
  }
  const keys = Object.keys(requests[0]);
  return requests.map((req) => {
    return keys.reduce((acc, val) => {
      if (val === 'car_type') {
        acc[snakeToCamel(val)] = req[val].toLowerCase();
      } else {
        acc[snakeToCamel(val)] = req[val];
      }
      return acc;
    }, {});
  });
};

export const getQueryFromFilter = (filter) => {
  return Object.keys(filter)
    .map((key) => {
      return filter[key]
        .map((val) => {
          return `filter[${key}]=${val}`;
        })
        .join('&');
    })
    .join('&');
};

export const getDriverFilterForActiveTab = (id) => ({
  status: ['Accepted', 'accepted', 'waiting_form_customer', 'in_progress'],
  driver_id: [id],
});
export const getDriverFilterForAllTab = (date: Date) => ({
  status: ['active', 'Active'],
  created_date: [date.toJSON()],
});
export const getUserFilterForActiveTab = (id) => ({
  status: [
    'active',
    'Postponed',
    'accepted',
    'waiting_form_customer',
    'in_progress',
  ],
  customer_id: [id],
});
export const getUserFilterForAllTab = (id, date?: Date) => {
  const filter: any = {
    status: ['done', 'canceled'],
    customer_id: [id],
  };

  if (date) {
    filter.created_date = [date.toJSON()];
  }

  return filter;
};

export const getRequestsWithFilter = async (
  filter,
  limit: number,
  offset: number,
  sorted: boolean = false
) => {
  let query = `${environment.apiUrl}requests?${getQueryFromFilter(
    filter
  )}&limit=${limit}&offset=${offset}`;

  if (sorted) {
    query += '&sort=last_update';
  }

  const res = await fetch(query);
  const requests = await res.json();

  return transformRequests(requests);
};

export type RequestTabs = 'active' | 'all';

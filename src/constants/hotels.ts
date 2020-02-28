export const MIN_PRICE_HOTEL = 0;
export const MAX_PRICE_HOTEL = 30000;

export const defaultState = {
  name: '',
  region: undefined,
  price: { from: MIN_PRICE_HOTEL, to: MAX_PRICE_HOTEL },
  limit: 10,
};

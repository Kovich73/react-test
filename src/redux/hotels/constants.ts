import { IHotel } from '../../interface/hotels';

export const FETCH_HOTELS_REQUEST = 'FETCH_HOTELS_REQUEST';
export const FETCH_HOTELS_SUCCESS = 'FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAILURE = 'FETCH_HOTELS_FAILURE';

export const FETCH_MORE_HOTELS_REQUEST = 'FETCH_MORE_HOTELS_REQUEST';
export const FETCH_MORE_HOTELS_SUCCESS = 'FETCH_MORE_HOTELS_SUCCESS';
export const FETCH_MORE_HOTELS_FAILURE = 'FETCH_MORE_HOTELS_FAILURE';

export interface PaginationProps {
  page: number;
  limit: number;
}

export interface HotelRequestProps {
  data: IHotel[];
  totalElements: number;
}

export interface FetchHotelsRequestInterface {
  type: typeof FETCH_HOTELS_REQUEST;
  params: PaginationProps;
}

export interface FetchHotelsSuccessInterface {
  type: typeof FETCH_HOTELS_SUCCESS;
  hotels: HotelRequestProps;
}

export interface FetchHotelsFailureInterface {
  type: typeof FETCH_HOTELS_FAILURE;
  error: any;
}

export type HotelsActionType =
  | FetchHotelsRequestInterface
  | FetchHotelsSuccessInterface
  | FetchHotelsFailureInterface;
